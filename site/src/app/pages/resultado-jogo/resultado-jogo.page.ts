import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController, LoadingController, AlertController } from '@ionic/angular';
import { JogoService } from 'src/app/services/jogo.service';
import { Jogo } from 'src/app/model/jogo';

@Component({
  selector: 'app-resultado-jogo',
  templateUrl: './resultado-jogo.page.html',
  styleUrls: ['./resultado-jogo.page.scss'],
})
export class ResultadoJogoPage implements OnInit {
  jogo: Jogo;
  formGroup: FormGroup;

  constructor(private loadingController: LoadingController, private jogoService: JogoService, private alertController: AlertController, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder) {
    this.jogo = new Jogo();

    this.formGroup = this.formBuilder.group({
      'idVencedor': ["", Validators.compose([
        Validators.required,
      ])],
    });

    let id = this.activatedRoute.snapshot.params['id'];
    if (id != null) {
      this.jogoService.buscarPorIdJogo(parseInt(id)).then((json) => {
        this.jogo = <Jogo>(json);
        this.formGroup.get('idVencedor')?.setValue(this.jogo.idVencedor);
        console.log(this.jogo);
      });
    }
  }

  ngOnInit() { }

  // async ionViewWillEnter() {
  //   this.carregarLista();
  // }

  // async carregarLista() {
  //   this.exibirLoader();

  //   let id = this.activatedRoute.snapshot.params['id'];
  //   if (id != null) {
  //     this.jogoService.buscarPorIdJogo(parseInt(id)).then((json) => {
  //       this.jogo = <Jogo>(json);
  //       console.log(this.jogo);
  //     });
  //   }

  //   this.fecharLoader();
  // }

  // exibirLoader() {
  //   this.loadingController.create({
  //     message: 'Carregando...'
  //   }).then((res) => {
  //     res.present();
  //   })
  // }

  // fecharLoader() {
  //   setTimeout(() => {
  //     this.loadingController.dismiss().then(() => {
  //     }).catch((erro) => {
  //       console.log('Erro: ', erro)
  //     });
  //   }, 1000);
  // }

  async salvar() {
    const alert = await this.alertController.create({
      header: 'Atenção ao salvar resultado.',
      message: 'Esse resultado não poderá ser alterado!',
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          handler: () => {
            let idVencedor = this.formGroup.value.idVencedor;
            this.jogoService.inserir(this.jogo, idVencedor).then((json) => {
              this.jogo = <Jogo>(json);
              this.exibirMensagem('Registro salvo com sucesso!');
              this.navController.navigateBack('tabela-torneio/' + this.jogo.idTorneio);
            }).catch((error) => {
              console.log(error);
              this.exibirMensagem('torneio ja cadastrado.');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}