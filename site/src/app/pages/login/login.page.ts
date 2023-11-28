import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastController, NavController, IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: Usuario;
  senha: string;
  email: string;
  formGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController,
    private formBuilder: FormBuilder, private usuarioService: UsuarioService) {
    this.email = "";
    this.senha = "";

    this.usuarioService.logout();
    
    this.usuario = new Usuario();

    this.formGroup = this.formBuilder.group(
      {
        'email': ["",
          Validators.compose(
            [
              Validators.required,
              Validators.email
            ])
        ],
        'senha': ["",
          Validators.compose(
            [
              Validators.required,
            ])
        ],

      }
    )
  }

  ngOnInit() {
  }

  async login() {
    this.senha = this.formGroup.value.senha;
    this.email = this.formGroup.value.email;

    await this.usuarioService.verificarUsuario(this.email, this.senha).then((json) => {
      let teste = <Usuario>(json);
      if (teste) {
        this.usuario = <Usuario>(json);
        this.exibirMensagem('Acesso permitido!');
        this.usuarioService.setUser(this.usuario);
        this.navController.navigateBack('/menu')
      } else {
        this.exibirMensagem('Dados incorretos');
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