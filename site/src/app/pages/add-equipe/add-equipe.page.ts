import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { Equipe } from 'src/app/model/equipe';
import { EquipeService } from 'src/app/services/equipe.service';
import { Modalidade } from 'src/app/model/modalidade';
import { ModalidadeService } from 'src/app/services/modalidade.service';
import { Atleta } from 'src/app/model/atleta';
import { AtletaService } from 'src/app/services/atleta.service';
import { AtletaEquipe } from 'src/app/model/atleta-equipe';
import { AtletaEquipeService } from 'src/app/services/atleta-equipe.service';

@Component({
  selector: 'app-add-equipe',
  templateUrl: './add-equipe.page.html',
  styleUrls: ['./add-equipe.page.scss'],
})
export class AddEquipePage implements OnInit {
  equipe: Equipe;
  modalidades: Modalidade[];
  formGroup: FormGroup;
  formGroup2: FormGroup;
  atletas: Atleta[];
  atletasSelecionados: Atleta[];


  constructor(private loadingController: LoadingController, private atletaEquipeService: AtletaEquipeService, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder,
    private equipeService: EquipeService, private atletaService: AtletaService, private modalidadeService: ModalidadeService) {
    this.atletas = [];
    this.atletasSelecionados = [];
    this.modalidades = [];
    this.equipe = new Equipe();

    this.formGroup = this.formBuilder.group({
      'nome': [null, Validators.compose([
        Validators.required,
      ])],
      'modalidade': [this.equipe.modalidade, Validators.compose([
        Validators.required,
      ])],
    });

    this.formGroup2 = this.formBuilder.group({
      'atleta': [, Validators.compose([
        Validators.required,
      ])],
    });


    let idEquipe = this.activatedRoute.snapshot.params['idEquipe'];
    if (idEquipe != null) {
      this.equipeService.buscarPorIdEquipe(parseInt(idEquipe)).then((json) => {
        this.equipe = <Equipe>(json);

        this.atletaService.listarPorEquipe(this.equipe.idEquipe).then((json) => {
          this.atletasSelecionados = <Atleta[]>(json);
        });

        this.formGroup.get('nome')?.setValue(this.equipe.nome);
        this.formGroup.get('modalidade')?.setValue(this.equipe.idModalidade);
      });
    }
  }

  ngOnInit() { }

  async carregarLista() {
    this.exibirLoader();

    this.atletaService.listar().then((json) => {
      this.atletas = <Atleta[]>(json);
    });

    this.modalidadeService.listar().then((json) => {
      this.modalidades = <Modalidade[]>(json);
    });

    if (this.equipe.idEquipe !== 0) {
      this.atletaService.listarPorEquipe(this.equipe.idEquipe).then((json) => {
        this.atletasSelecionados = <Atleta[]>(json);

        for (let atleta of this.atletasSelecionados) {
          this.atletas.splice(this.atletas.findIndex((elemento: Atleta) => elemento.idAtleta === atleta.idAtleta), 1);
        }
      });
    }

    this.fecharLoader();
  }

  exibirLoader() {
    this.loadingController.create({
      message: 'Carregando...'
    }).then((res) => {
      res.present();
    })
  }

  fecharLoader() {
    setTimeout(() => {
      this.loadingController.dismiss().then(() => {
      }).catch((erro) => {
        console.log('Erro: ', erro)
      });
    }, 1000);
  }

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async remover(atleta: Atleta) {
    await this.atletaEquipeService.removerAtleta(this.equipe.idEquipe, atleta.idAtleta).then((json) => {
      let resposta = <AtletaEquipe>(json);

      if (resposta) {
        this.exibirMensagem("Acerto");
      } else {
        this.exibirMensagem("Erro");
      }
    });

    this.carregarLista();
  }


  // atletasSelecionados = [];

  // async selecionarAtleta() {
  //   this.atletasSelecionados.push();
  // }

  // async salvar() {
  //   // Verifica se o formulário é válido
  //   if (this.formGroup.valid) {
  //     this.equipe.nome = this.formGroup.value.nome;
  //     this.equipe.modalidade = this.formGroup.value.modalidade;

  //     if (!this.equipeService.salvar(this.equipe)) {
  //       this.exibirMensagem('Equipe já cadastrada.');
  //     } else {
  //       this.exibirMensagem('Registro salvo com sucesso!');
  //       this.navController.navigateBack('/equipe');
  //     }
  //   } else {
  //     // Caso o formulário não seja válido, exiba uma mensagem ou lide com isso de acordo com suas necessidades
  //     this.exibirMensagem('Por favor, preencha todos os campos corretamente.');
  //   }
  // }

  // async salvar() {
  //   this.equipe.nome = this.formGroup.value.nome;
  //   this.equipe.modalidade = this.formGroup.value.modalidade;
  //   this.equipe.atleta = this.formGroup.value.atleta;

  //   this.equipeService.inserir(this.equipe)
  //     .then((json) => {
  //       this.equipe = <Equipe>(json);
  //       if (this.equipe) {
  //         this.exibirMensagem('Registro salvo com sucesso!');
  //         this.navController.navigateBack('/equipe');
  //       } else {
  //         this.exibirMensagem('Erro ao salvar o registro!')
  //       }
  //     })
  //     .catch((erro) => {
  //       this.exibirMensagem('Erro ao salvar o registro! Erro: ' + erro['mensage']);
  //     });
  // }

  async adcionarAtleta() {
    let atletaEquipe: AtletaEquipe = new AtletaEquipe();
    atletaEquipe.idAtleta = this.formGroup2.value.atleta;
    atletaEquipe.idEquipe = this.equipe.idEquipe;

    await this.atletaEquipeService.inserir(atletaEquipe).then((json) => {
      atletaEquipe = <AtletaEquipe>(json);

      if (atletaEquipe) {
        this.exibirMensagem("Acerto");
        this.formGroup2.get('atleta')?.setValue("");
      } else {
        this.exibirMensagem("Erro");
      }
    });

    this.carregarLista();
  }


  async salvar() {
    this.equipe.nome = this.formGroup.value.nome;

    let modalidade = this.modalidades.find((modalidade: Modalidade) =>
      modalidade.idModalidade === this.formGroup.value.modalidade
    );

    this.equipe.idModalidade = modalidade!.idModalidade;
    this.equipe.modalidade = modalidade!.nome;

    await this.equipeService.inserir(this.equipe).then((json) => {
      this.equipe = <Equipe>(json);
      this.exibirMensagem('Registro salvo com sucesso!');
      this.navController.navigateBack('/equipe');
    }).catch((error) => {
      console.log(error);
      this.exibirMensagem('equipe ja cadastrado.');
    });
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}