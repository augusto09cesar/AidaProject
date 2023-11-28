import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Curso } from 'src/app/model/curso';
import { Turma } from 'src/app/model/turma';
import { LoadingController } from '@ionic/angular';
import { CursoService } from 'src/app/services/curso.service';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-add-turma',
  templateUrl: './add-turma.page.html',
  styleUrls: ['./add-turma.page.scss'],
})
export class AddTurmaPage implements OnInit {

  turma: Turma;
  formGroup: FormGroup;
  cursos: Curso[];

  constructor(private loadingController: LoadingController, private cursoService: CursoService, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder, private turmaService: TurmaService) {
    this.turma = new Turma();
    this.cursos = [];

    this.formGroup = this.formBuilder.group({
      'nome': [this.turma.nome, Validators.compose([
        Validators.required,
      ])],
      'idCurso': [this.turma.idCurso, Validators.compose([
        Validators.required,
      ])]
    })


    let idTurma = this.activatedRoute.snapshot.params['id'];
    if (idTurma != null) {
      this.turmaService.buscarPorIdTurma(parseInt(idTurma)).then((json) => {
        this.turma = <Turma>(json);
        this.formGroup.get('nome')?.setValue(this.turma.nome);
        this.formGroup.get('idCurso')?.setValue(this.turma.idCurso);
      });
    }
  }

  ngOnInit() { 

  }

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    this.exibirLoader();
    
    await this.cursoService.listar().then((json) => {
      this.cursos = <Curso[]>(json);
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

  async salvar() {
    this.turma.nome = this.formGroup.value.nome;
    this.turma.idCurso = this.formGroup.value.idCurso;

    this.turmaService.inserir(this.turma).then((json) => {
      this.turma = <Turma>(json);
      this.exibirMensagem('Registro salvo com sucesso!');
      this.navController.navigateBack('/turma');
    }).catch((error) => {
      console.log(error);
      this.exibirMensagem('Turma já cadastrado.');
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
