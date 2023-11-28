import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
})
export class RecuperarSenhaPage implements OnInit {

  formGroup: FormGroup;

  constructor(private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder, private usuarioService: UsuarioService) {


    this.formGroup = this.formBuilder.group(
      {
        'email': ["",
          Validators.compose(
            [
              Validators.email,
              Validators.required
            ])
        ],
      }
    )
  }

  ngOnInit() {
  }

  async recuperarSenha() {
      let email = this.formGroup.value.email;

    await this.usuarioService.recuperarSenha(email).then((json) => {
      let usuario = <Usuario>(json);

      if (usuario === null) {
        this.exibirMensagem('Usuário não encontrado.');
      } else {

        this.exibirMensagem('Um email com sua senha foi enviado a você!');
        this.navController.navigateBack('/login')
      }
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
