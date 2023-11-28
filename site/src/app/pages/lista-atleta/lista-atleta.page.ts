import { Component, OnInit } from '@angular/core';
import { Atleta } from 'src/app/model/atleta';
import { AtletaService } from 'src/app/services/atleta.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-lista-atleta',
  templateUrl: './lista-atleta.page.html',
  styleUrls: ['./lista-atleta.page.scss'],
})
export class ListaAtletaPage implements OnInit {
  
  atletas: Atleta[];
  atleta: Atleta;

  constructor(private toastController: ToastController, private alertController: AlertController, 
    private atletaService: AtletaService, private loadingController: LoadingController) {
      this.atletas = [];
      this.atleta = new Atleta();
     }

  ngOnInit() {
  }


  async ionViewWillEnter(){
  }

  // async salvar() {
  //   await this.atletaService.salvar(this.atleta);
  //   //this.atletas= []; // Limpar os campos após salvar
  //   this.carregarAtletas();
  // }

  async carregarAtletas() {
  }
  // async registrarFoto() {
  //   await this.fotoService.registrar(this.arvore.id).then(() => {
  //     this.exibirLoader();
  //     this.fotoService.listarPorIdArvore(this.arvore.id).then((json) => {
  //       this.fotos = <Foto[]>(json);
  //       this.fecharLoader();
  //     });
  //   })
  // }

  // async excluirFoto(idFoto: number) {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Fotos',
  //     buttons: [{
  //       text: 'Excluir',
  //       icon: 'trash',
  //       handler: () => {
  //         this.atletaService.excluir(idFoto).then(() => {
  //           this.carregarLista();
  //         })
  //       }
  //     }, {
  //       text: 'Cancelar',
  //       icon: 'close',
  //     }]
  //   });
  //   await actionSheet.present();
  // }

  // async carregarLista() {
  //   this.exibirLoader();
  //   await this.atletaService.buscarPorId(this.atleta.id).then((json) => {
  //     this.fotos = <Foto[]>(json);
  //     this.fecharLoader();
  //   });

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
  //   }, 500);
  // }


}
