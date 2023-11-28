import { Component, OnInit } from '@angular/core';
import { Modalidade } from 'src/app/model/modalidade';
import { ModalidadeService } from 'src/app/services/modalidade.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modalidade',
  templateUrl: './modalidade.page.html',
  styleUrls: ['./modalidade.page.scss'],
})
export class ModalidadePage implements OnInit {

  modalidades: Modalidade[];
  modalidade: Modalidade;

  constructor(usuarioService: UsuarioService, private toastController: ToastController, private alertController: AlertController, 
    private modalidadeService: ModalidadeService, private loadingController: LoadingController) { 
  this.modalidades = [];
  this.modalidade = new Modalidade()
  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.modalidadeService.listar().then((json)=>{
      this.modalidades = <Modalidade[]> (json);
    });
  }

  // async excluir(modalidade: Modalidade) {
  //   const alert = await this.alertController.create({
  //     header: 'Confirma a exclusão?', 
  //     message: modalidade.nome,
  //     buttons: [
  //       {
  //         text: 'Cancelar'
  //       }, {
  //         text: 'Confirmar',
  //         cssClass: 'danger',
  //         handler: () => {
  //           this.exibirMensagem('Registro excluído com sucesso!!!');
  //           this.modalidadeService.excluir(modalidade.id);
  //           this.ionViewWillEnter();
  //         },
  //       }
  //     ]
  //   })
  //   await alert.present();
  // }

 

  async carregarLista(){
    let modalidade = JSON.parse(localStorage.getItem('modalidade') || 'null');
    console.log(modalidade)
    this.exibirLoader();
    await this.modalidadeService.listar().then((json)=>{
      this.modalidades = <Modalidade[]> (json);
    });
    this.fecharLoader();
  }

  exibirLoader(){
    this.loadingController.create({
      message: 'Carregando...'
    }).then((res)=>{
      res.present();
    })
  }

  async excluir(modalidade: Modalidade){
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: modalidade.nome,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {   
            this.modalidadeService.excluir(modalidade.idModalidade).then(()=>{
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

  fecharLoader(){
    setTimeout(()=>{
      this.loadingController.dismiss().then(()=>{
      }).catch((erro)=>{
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
