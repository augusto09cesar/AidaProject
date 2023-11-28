import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Modalidade } from 'src/app/model/modalidade';
import { ModalidadeService } from 'src/app/services/modalidade.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-modalidade',
  templateUrl: './add-modalidade.page.html',
  styleUrls: ['./add-modalidade.page.scss'],
})
export class AddModalidadePage implements OnInit {

  modalidade: Modalidade;
  formGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController,
    private formBuilder: FormBuilder, private alertController: AlertController, private modalidadeService: ModalidadeService) {
    this.modalidade = new Modalidade();
    this.formGroup = this.formBuilder.group({
      'nome': [null, Validators.compose([
        Validators.required,
      ])]
    });

    let idModalidade = this.activatedRoute.snapshot.params['idModalidade'];
    if (idModalidade != null) {
      this.modalidadeService.buscarPorId(parseInt(idModalidade)).then((json) => {
        this.modalidade = <Modalidade>(json);
        this.formGroup.get('nome')?.setValue(this.modalidade.nome);
      });
    }
  }

  ngOnInit() {
  }

  //  async salvar(){
  //    let nome = this.formGroup.value.nome;
  //    this.navController.navigateBack('/modalidade');

  //    if (this.modalidade.id > 0) {
  //      this.exibirMensagem('Cadastro realizado com sucesso!')
  //      this.navController.navigateBack('/login');
  //    } else {
  //      this.exibirMensagem('Erro ao cadastrar!')
  //    }
  //   }

  async salvar() {
    this.modalidade.nome = this.formGroup.value.nome;

    this.modalidadeService.inserir(this.modalidade).then((json) => {
      this.exibirMensagem('Registro salvo com sucesso!');
      this.navController.navigateBack('/modalidade');
    }).catch((error) => {
      console.log(error);
      this.exibirMensagem('Modalidade ja cadastrada.');
    })
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}
