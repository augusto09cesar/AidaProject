import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Equipe } from 'src/app/model/equipe';
import { EquipeService } from 'src/app/services/equipe.service';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.page.html',
  styleUrls: ['./equipe.page.scss'],
})
export class EquipePage implements OnInit {

  equipes: Equipe[];
  equipe: Equipe;

  constructor(private equipeService: EquipeService, private toastController: ToastController, private alertController: AlertController,
    private loadingController: LoadingController) {

    this.equipes = [];
    this.equipe = new Equipe()
  }

  ngOnInit() {
  }
  async ionViewWillEnter() {
    this.equipeService.listar().then((json) => {
      console.log(json);
      this.equipes = <Equipe[]>(json);
    });
  }

  async carregarLista() {
    this.exibirLoader();
    await this.equipeService.listar().then((json) => {
      this.equipes = <Equipe[]>(json);
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

  async excluir(equipe: Equipe) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: equipe.nome,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.equipeService.excluir(equipe.idEquipe).then(() => {
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
