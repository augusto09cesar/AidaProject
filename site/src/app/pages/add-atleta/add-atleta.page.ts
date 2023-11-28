import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Atleta } from 'src/app/model/atleta';
import { AtletaService } from 'src/app/services/atleta.service';
import { Util } from '../util/util';
import { TurmaService } from 'src/app/services/turma.service';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/model/curso';
import { Turma } from 'src/app/model/turma';

@Component({
  selector: 'app-add-atleta',
  templateUrl: './add-atleta.page.html',
  styleUrls: ['./add-atleta.page.scss'],
})
export class AddAtletaPage implements OnInit {
  cursos: Curso[];
  turmas: Turma[];
  atleta: Atleta;
  formGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder, private atletaService: AtletaService, private cursoService: CursoService, private turmaService: TurmaService) {
    this.atleta = new Atleta();
    this.cursos = [];
    this.turmas = [];

    this.formGroup = this.formBuilder.group({
      'nome': [this.atleta.nome, Validators.compose([
        Validators.required,
      ])],
      'cpf': this.formBuilder.control({ value: null, disabled: false }, Util.isValidCpf()),
      'email': [this.atleta.email, Validators.compose([
        Validators.email,
        Validators.required,
      ])],
      'idTurma': [, Validators.compose([
        Validators.required,
      ])],
      'idCurso': [, Validators.compose([
        Validators.required,
      ])],
    })


    let idAtleta = this.activatedRoute.snapshot.params['idAtleta'];
    if (idAtleta != null) {
      this.atletaService.buscarPoridAtleta(parseInt(idAtleta)).then((json) => {
        this.atleta = <Atleta>(json);
        this.formGroup.get('nome')?.setValue(this.atleta.nome);
        this.formGroup.get('cpf')?.setValue(this.atleta.cpf);
        this.formGroup.get('email')?.setValue(this.atleta.email);
        this.formGroup.get('idCurso')?.setValue(this.atleta.idCurso);

        let idCurso = this.formGroup.value.idCurso;

        this.turmaService.listarPorCurso(idCurso)
          .then((json) => {
            this.turmas = <Turma[]>(json);
          });

        this.formGroup.get('idTurma')?.setValue(this.atleta.idTurma);
      });
    }
  }

  async carregarListaTurma() {
    let idCurso = this.formGroup.value.idCurso;

    await this.turmaService.listarPorCurso(idCurso)
      .then((json) => {
        this.turmas = <Turma[]>(json);
      });
  }

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    await this.cursoService.listar().then((json) => {
      this.cursos = <Curso[]>(json);
    });
  }


  ngOnInit() { }

  async salvar() {
    this.atleta.nome = this.formGroup.value.nome;
    this.atleta.email = this.formGroup.value.email;
    this.atleta.cpf = this.formGroup.value.cpf;
    this.atleta.idTurma = this.formGroup.value.idTurma;
    this.atleta.idCurso = this.formGroup.value.idCurso;

    this.atletaService.inserir(this.atleta).then((json) => {
      this.atleta = <Atleta>(json);
      this.exibirMensagem('Registro salvo com sucesso!');
      this.navController.navigateBack('/atleta');
    }).catch((error) => {
      console.log(error);
      this.exibirMensagem('Atleta ja cadastrado.');
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
