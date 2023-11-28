import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Util } from '../util/util';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.page.html',
  styleUrls: ['./meus-dados.page.scss'],
})
export class MeusDadosPage implements OnInit {
  usuario: Usuario;
  formGroup: FormGroup;

  constructor(private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder, private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.getUser();

    this.formGroup = this.formBuilder.group({
      'nome': [null, Validators.compose([
        Validators.required,
      ])],
      'cpf': this.formBuilder.control({ value: null, disabled: false }, Util.isValidCpf()),
      'email': [null, Validators.compose([
        Validators.email,
        Validators.required,
      ])],
      'senha': [null, Validators.compose([
        Validators.required,
      ])]
    });

    this.formGroup.get('nome')?.setValue(this.usuario.nome);
    this.formGroup.get('cpf')?.setValue(this.usuario.cpf);
    this.formGroup.get('email')?.setValue(this.usuario.email);
    this.formGroup.get('senha')?.setValue(this.usuario.senha);
  }

  ngOnInit() {
  }


  async salvar() {
    this.usuario.nome = this.formGroup.value.nome;
    this.usuario.cpf = this.formGroup.value.cpf;
    this.usuario.email = this.formGroup.value.email;
    this.usuario.senha = this.formGroup.value.senha;

    this.usuarioService.acessar(this.usuario).then((json) => {
      this.usuario = <Usuario>(json);

      if (this.usuario.idUsuario > 0) {
        this.exibirMensagem('Dados alterados com sucesso!')
        this.usuarioService.setUser(this.usuario);
        this.navController.navigateBack('/menu');
      } else {
        this.exibirMensagem('Erro ao cadastrar!')
      }
    }).catch((erro) => {
      this.exibirMensagem("Erro ao cadastrar usuário! Erro:" + erro['menssage'])
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
