import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Curso } from 'src/app/model/curso';
import { CursoService } from 'src/app/services/curso.service';


@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.page.html',
  styleUrls: ['./add-curso.page.scss'],
})
export class AddCursoPage implements OnInit {
  curso: Curso;
  formGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder, private cursoService: CursoService) {
    this.curso = new Curso();

    this.formGroup = this.formBuilder.group({
      'nome': [this.curso.nome, Validators.compose([
        Validators.required,
      ])]
    })


    let idCurso = this.activatedRoute.snapshot.params['id'];
    if (idCurso != null) {
      this.cursoService.buscarPorIdCurso(parseInt(idCurso)).then((json) => {
        this.curso = <Curso>(json);
        this.formGroup.get('nome')?.setValue(this.curso.nome);
      });
    }
  }

  ngOnInit() { }

  async salvar() {
    this.curso.nome = this.formGroup.value.nome;

    this.cursoService.inserir(this.curso).then((json) => {
      this.curso = <Curso>(json);
      this.exibirMensagem('Registro salvo com sucesso!');
      this.navController.navigateBack('/curso');
    }).catch((error) => {
      console.log(error);
      this.exibirMensagem('curso ja cadastrado.');
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
