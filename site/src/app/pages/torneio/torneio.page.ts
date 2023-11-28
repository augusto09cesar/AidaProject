import { Component, OnInit } from '@angular/core';
import { Torneio } from 'src/app/model/torneio';
import { TorneioService } from 'src/app/services/torneio.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-torneio',
  templateUrl: './torneio.page.html',
  styleUrls: ['./torneio.page.scss'],
})
export class TorneioPage implements OnInit {

  torneios: Torneio[];
  torneio: Torneio;

  constructor(usuarioService: UsuarioService, private toastController: ToastController, private alertController: AlertController,
    private torneioService: TorneioService, private loadingController: LoadingController) {
    this.torneios = [];
    this.torneio = new Torneio()
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.torneioService.listar().then((json) => {
      this.torneios = <Torneio[]>(json);
    });
  }

  // async excluir(Torneio: Torneio) {
  //   const alert = await this.alertController.create({
  //     header: 'Confirma a exclusão?', 
  //     message: Torneio.nome,
  //     buttons: [
  //       {
  //         text: 'Cancelar'
  //       }, {
  //         text: 'Confirmar',
  //         cssClass: 'danger',
  //         handler: () => {
  //           this.exibirMensagem('Registro excluído com sucesso!!!');
  //           this.TorneioService.excluir(Torneio.id);
  //           this.ionViewWillEnter();
  //         },
  //       }
  //     ]
  //   })
  //   await alert.present();
  // }



  async carregarLista() {
    let Torneio = JSON.parse(localStorage.getItem('Torneio') || 'null');
    console.log(Torneio)
    this.exibirLoader();
    await this.torneioService.listar().then((json) => {
      this.torneios = <Torneio[]>(json);
    });
    this.fecharLoader();
  }

  exibirLoader() {
    this.loadingController.create({
      message: 'Carregando...'
    }).then((res) => {
      res.present();
    })
  }

  async excluir(torneio: Torneio) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: torneio.nome,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.torneioService.excluir(torneio.idTorneio).then(() => {
              this.carregarLista();
              this.exibirMensagem('Registro excluído com sucesso!');
            }).catch(() => {
              this.exibirMensagem('Erro ao excluir o registro.');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  fecharLoader() {
    setTimeout(() => {
      this.loadingController.dismiss().then(() => {
      }).catch((erro) => {
        console.log('Erro: ', erro)
      });
    }, 1000);
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}
