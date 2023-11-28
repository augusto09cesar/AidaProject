import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController, LoadingController, AlertController } from '@ionic/angular';
import { Equipe } from 'src/app/model/equipe';
import { EquipeService } from 'src/app/services/equipe.service';
import { Modalidade } from 'src/app/model/modalidade';
import { ModalidadeService } from 'src/app/services/modalidade.service';
import { Torneio } from 'src/app/model/torneio';
import { TorneioService } from 'src/app/services/torneio.service';
import { EquipeTorneioService } from 'src/app/services/equipe-torneio.service';
import { EquipeTorneio } from 'src/app/model/equipe-torneio';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { JogoService } from 'src/app/services/jogo.service';

@Component({
  selector: 'app-add-torneio',
  templateUrl: './add-torneio.page.html',
  styleUrls: ['./add-torneio.page.scss'],
})
export class AddTorneioPage implements OnInit {
  torneio: Torneio;
  modalidades: Modalidade[];
  equipes: Equipe[];
  formGroup: FormGroup;
  formGroup2: FormGroup;
  usuario: Usuario;
  equipesSelecionadas: Equipe[];
  modalidadeSelecionada: Modalidade;
  quantidadeCerta: boolean;

  constructor(private jogoService: JogoService, private alertController: AlertController, private loadingController: LoadingController, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder,
    private equipeService: EquipeService, private usuarioService: UsuarioService, private modalidadeService: ModalidadeService, private torneioService: TorneioService, private equipeTorneioService: EquipeTorneioService) {
    this.equipesSelecionadas = [];
    this.modalidades = [];
    this.equipes = [];
    this.torneio = new Torneio();
    this.usuario = this.usuarioService.getUser();
    this.modalidadeSelecionada = new Modalidade();
    this.quantidadeCerta = false;

    this.formGroup = this.formBuilder.group({
      'nome': [this.torneio.nome, Validators.compose([
        Validators.required,
      ])],
      'quantidadeDeEquipes': [this.torneio.quantidadeDeEquipes, Validators.compose([
        Validators.required,
      ])],
      'regras': [this.torneio.regras, Validators.compose([
        Validators.required,
      ])],
      'idModalidade': [this.torneio.idModalidade, Validators.compose([
        Validators.required,
      ])],
    });

    this.formGroup2 = this.formBuilder.group({
      'idEquipe': [, Validators.compose([
        Validators.required,
      ])],
    });


    let idTorneio = this.activatedRoute.snapshot.params['idTorneio'];
    if (idTorneio != null) {
      this.torneioService.buscarPorIdtorneio(parseInt(idTorneio)).then(async (json) => {
        this.torneio = <Torneio>(json);

        this.equipeService.listarPorTorneio(this.torneio.idTorneio).then((json) => {
          this.equipesSelecionadas = <Equipe[]>(json);
          if (this.equipesSelecionadas.length === this.formGroup.value.quantidadeDeEquipes) {
            this.quantidadeCerta = true;
          }
        });

        this.formGroup.get('nome')?.setValue(this.torneio.nome);
        this.formGroup.get('quantidadeDeEquipes')?.setValue(this.torneio.quantidadeDeEquipes);
        this.formGroup.get('regras')?.setValue(this.torneio.regras);
        this.formGroup.get('idModalidade')?.setValue(this.torneio.idModalidade);

        await this.modalidadeService.buscarPorId(this.torneio.idModalidade).then((json) => {
          this.modalidadeSelecionada = <Modalidade>(json);
        });

        await this.equipeService.buscarPorIdModalidade(this.torneio.idModalidade)
          .then((json) => {
            this.equipes = <Equipe[]>(json);
            if (this.equipes.length === 0) {
              this.exibirMensagem("Não há equipes com essa modalidade.");
            }
          });

        await this.equipeService.listarPorTorneio(this.torneio.idTorneio).then((json) => {
          this.equipesSelecionadas = <Equipe[]>(json);

          if (this.equipesSelecionadas.length === this.torneio.quantidadeDeEquipes) {
            this.quantidadeCerta = true;
          }

          for (let equipe of this.equipesSelecionadas) {
            this.equipes.splice(this.equipes.findIndex((elemento: Equipe) => elemento.idEquipe === equipe.idEquipe), 1);
          }
        });
      });
    }
  }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    this.exibirLoader();

    let idModalidade = this.formGroup.value.idModalidade;

    await this.equipeService.buscarPorIdModalidade(idModalidade)
      .then((json) => {
        this.equipes = <Equipe[]>(json);
        if (this.equipes.length === 0) {
          this.exibirMensagem("Não há equipes com essa modalidade.");
        }
      });

    await this.modalidadeService.listar().then((json) => {
      this.modalidades = <Modalidade[]>(json);
    });

    if (this.torneio.idTorneio !== 0) {
      await this.equipeService.listarPorTorneio(this.torneio.idTorneio).then((json) => {
        this.equipesSelecionadas = <Equipe[]>(json);

        for (let equipe of this.equipesSelecionadas) {
          this.equipes.splice(this.equipes.findIndex((elemento: Equipe) => elemento.idEquipe === equipe.idEquipe), 1);
        }
      });
    }

    if (this.equipesSelecionadas.length === this.torneio.quantidadeDeEquipes) {
      this.quantidadeCerta = true;
    } else {
      this.quantidadeCerta = false;
    }

    this.fecharLoader();
  }

  async verificarQuantidade(){
    let quantidadeDeEquipes = this.formGroup.value.quantidadeDeEquipes;

    if (quantidadeDeEquipes < this.equipesSelecionadas.length){

      const alert = await this.alertController.create({
        header: 'Atenção.',
        message: 'Você não pode colocar uma quantidade de equipes menor que a quantidade que já foi selecionada para esse torneio!',
        buttons: [
          {
            text: 'OK'
          }
        ]
      });

      await alert.present();

      this.formGroup.get('quantidadeDeEquipes')?.setValue(this.torneio.quantidadeDeEquipes);
    } else if (quantidadeDeEquipes > this.equipesSelecionadas){
      const alert = await this.alertController.create({
        header: 'Atenção.',
        message: 'Atualize (salve) as informações do torneio para colocar mais equipes!',
        buttons: [
          {
            text: 'OK'
          }
        ]
      });

      await alert.present();
    }
  }

  async carregarListaEquipes() {
    let idModalidade = this.formGroup.value.idModalidade;

    await this.equipeService.buscarPorIdModalidade(idModalidade)
      .then((json) => {
        this.equipes = <Equipe[]>(json);
        if (this.equipes.length === 0) {
          this.exibirMensagem("Não há equipes com essa modalidade.");
        }
      });
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

  async remover(equipe: Equipe) {
    await this.equipeTorneioService.removerEquipe(this.torneio.idTorneio, equipe.idEquipe).then((json) => {
      let resposta = <EquipeTorneio>(json);
    });

    this.carregarLista();
  }

  async adcionarEquipe() {
    let equipeTorneio: EquipeTorneio = new EquipeTorneio();
    equipeTorneio.idEquipe = this.formGroup2.value.idEquipe;
    equipeTorneio.idTorneio = this.torneio.idTorneio;

    await this.equipeTorneioService.inserir(equipeTorneio).then((json) => {
      equipeTorneio = <EquipeTorneio>(json);

      if (equipeTorneio) {
        this.exibirMensagem("Equipe adcionada.");
        this.formGroup2.get('idEquipe')?.setValue("");
      } else {
        this.exibirMensagem("Erro");
      }
    });

    this.carregarLista();
  }


  async salvar() {
    this.torneio.nome = this.formGroup.value.nome;
    this.torneio.quantidadeDeEquipes = this.formGroup.value.quantidadeDeEquipes;
    this.torneio.regras = this.formGroup.value.regras;
    this.torneio.idModalidade = this.formGroup.value.idModalidade;
    this.torneio.idUsuario = this.usuario.idUsuario;

    if (this.torneio.idTorneio === 0) {
      const alert = await this.alertController.create({
        header: 'Atenção ao criar torneio.',
        message: 'A modalidade no torneio não poderá ser alterada!',
        buttons: [
          {
            text: 'Cancelar'
          }, {
            text: 'Confirmar',
            handler: () => {
              this.torneioService.inserir(this.torneio).then((json) => {
                this.torneio = <Torneio>(json);
                this.exibirMensagem('Registro salvo com sucesso!');
                this.navController.navigateBack('/torneio');
              }).catch((error) => {
                console.log(error);
                this.exibirMensagem('torneio ja cadastrado.');
              });
            }
          }
        ]
      });
      await alert.present();

    } else {
      await this.torneioService.inserir(this.torneio).then((json) => {
        this.torneio = <Torneio>(json);
        this.exibirMensagem('Registro salvo com sucesso!');
        this.navController.navigateBack('/torneio');
      }).catch((error) => {
        console.log(error);
        this.exibirMensagem('torneio ja cadastrado.');
      });
    }
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  async gerarTorneio() {
    const alert = await this.alertController.create({
      header: 'Aviso!',
      message: 'Você não poderá alterar mais nenhum dado do torneio.',
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          handler: () => {
            this.loadingController.create({
              message: 'Gerando as partidas do torneio...'
            }).then((res) => {
              res.present();
            })

            this.torneio.iniciado = true;

            this.salvar();
            this.jogoService.gerarTorneio(this.torneio.idTorneio).then();

            setTimeout(() => {
              this.loadingController.dismiss().then(() => {
              }).catch((erro) => {
                console.log('Erro: ', erro)
              });
            }, 2500);
          }
        }
      ]
    });
    await alert.present();
  }
}
