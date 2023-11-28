import { Component, OnInit } from '@angular/core';
import { Atleta } from 'src/app/model/atleta';
import { AtletaService } from 'src/app/services/atleta.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-atleta',
  templateUrl: './atleta.page.html',
  styleUrls: ['./atleta.page.scss'],
})
export class AtletaPage implements OnInit {
  atletas: Atleta[];
  atleta: Atleta;

  constructor(usuarioService: UsuarioService, private toastController: ToastController, private alertController: AlertController,
    private atletaService: AtletaService, private loadingController: LoadingController) {
    this.atletas = [];
    this.atleta = new Atleta();
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.atletaService.listar().then((json) => {
      this.atletas = <Atleta[]>(json);
    });
  }

  // async excluir(atleta: Atleta) {
  //   const alert = await this.alertController.create({
  //     header: 'Confirma a exclusão?', 
  //     message: atleta.nome,
  //     buttons: [
  //       {
  //         text: 'Cancelar'
  //       }, {
  //         text: 'Confirmar',
  //         cssClass: 'danger',
  //         handler: () => {
  //           this.exibirMensagem('Registro excluído com sucesso!!!');
  //           this.atletaService.excluir(atleta.id);
  //           this.ionViewWillEnter();
  //         },
  //       }
  //     ]
  //   })
  //   await alert.present();
  // }

  async carregarLista() {
    this.exibirLoader();
    await this.atletaService.listar().then((json) => {
      this.atletas = <Atleta[]>(json);
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

  fecharLoader() {
    setTimeout(() => {
      this.loadingController.dismiss().then(() => {
      }).catch((erro) => {
        console.log('Erro: ', erro)
      });
    }, 1000);
  }

  async excluir(atleta: Atleta) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: atleta.nome,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.atletaService.excluir(atleta.idAtleta).then(() => {
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

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}