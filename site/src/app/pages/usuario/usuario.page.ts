import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastController, NavController, AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  
  // usuario: Usuario;

  // // constructor(private toastController: ToastController, private alertController: AlertController, 
  // //   private loadingController: LoadingController, private usuarioService: UsuarioService, navController: NavController) { 
  // this.usuarios = [];
  // this.usuario = new Usuario();

  // }

 
  usuarios: Usuario[];
  usuario: Usuario;
  
  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService, private fbuilder: FormBuilder, private toastController:
    ToastController, private navController: NavController, private alertController: AlertController, private loadingController: LoadingController) {  
      this.usuarios = [];
      this.usuario = new Usuario();

    }// this.usuario = <Usuario>this.usuarioService.getUser();
      // console.log(this.usuario)
    

      // this.formGroup = this.fbuilder.group(
      //   {
      //     'nome': [this.usuario.nome],
      //     'email': [this.usuario.email],
      //   }
      // )
      

  ngOnInit() {
  }


  // async ionViewWillEnter(){
  //   this.usuarioService.listar().then((json)=>{
  //     console.log(json);
  //     this.usuario = <Usuario> (json);
  //   });
  // }

  // async salvar(){
  //   this.usuario.nome = this.formGroup.value.nome;
   
  //   this.usuarioService.acessar(this.usuario).then((json)=>{
  //     this.usuario = <Usuario>(json);
  //     if (this.usuario.idUsuario > 0){
  //       localStorage.setItem('usuario', JSON.stringify(this.usuario));
  //       this.exibirMensagem('Dados atualizados com sucesso')
  //       this.navController.navigateBack('/menu');
  //     }else {
  //       this.exibirMensagem('Erro ao atualizar dados')
  //     }
  //   })
  // }

  // async recuperarSenha(){
  //   this.usuario.email = this.formGroup.value.email;
  //   this.usuarioService.recuperarSenha(this.usuario.email).then((json)=>{
  //     let teste = <boolean> (json);
  //     if(teste = true){
  //       this.exibirMensagem("Senha enviada para o email de cadastro!");
  //       this.navController.navigateBack('/menu');
  //     }else{
  //       this.exibirMensagem("Erro ao recuperar Senha!");
  //     }
  //   }).catch((erro) => {
  //     this.exibirMensagem("Erro ao realizar função! Erro: " + erro['menssage'])
  //   });
  // }

  // async exibirMensagem(texto: string) {
  //   const toast = await this.toastController.create({
  //     message: texto,
  //     duration: 1500
  //   });
  //   toast.present();
  // }

  async ionViewWillEnter(){
    this.usuarioService.listar().then((json)=>{
      console.log(json);
      this.usuarios = <Usuario[]> (json);
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

  async carregarLista(){
    let usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    console.log(usuario)
    this.exibirLoader();
    await this.usuarioService.listar().then((json)=>{
      this.usuarios = <Usuario[]> (json);
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

  fecharLoader(){
    setTimeout(()=>{
      this.loadingController.dismiss().then(()=>{
      }).catch((erro)=>{
        console.log('Erro: ', erro)
      });
    }, 1000);
  }

  async excluir(usuario: Usuario){
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: usuario.nome,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {   
            this.usuarioService.excluir(usuario.idUsuario).then(()=>{
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