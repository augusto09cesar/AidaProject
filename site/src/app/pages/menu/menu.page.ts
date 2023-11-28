import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public appPages = [
    { title: 'Gerenciar Atletas', url: '/atleta', icon: 'body-outline', color: 'success' },
    { title: 'Gerenciar Equipes', url: '/equipe', icon: 'people-outline', color: 'tertiary' },
    { title: 'Gerenciar Modalidade', url: '/modalidade', icon: 'bicycle-outline', color: 'medium' },
    { title: 'Cadastrar Torneio', url: '/torneio', icon: 'game-controller-outline', color: 'warning' },
    { title: 'Gerenciar Cursos', url: '/curso', icon: 'copy-outline', color: 'success' },
    { title: 'Gerenciar Turmas', url: '/turma', icon: 'school-outline', color: 'tertiary' },
    { title: 'Meus Dados', url: '/meus-dados', icon: 'person-circle', color: 'danger' },
    { title: 'SAIR', url: '/login', icon: 'log-out-outline', color: 'dark' }, 
  ];


  constructor(private navController: NavController, private usuarioService: UsuarioService) {

  }

  ngOnInit() {
  }

  deslogar() {
    this.usuarioService.logout();
    this.navController.navigateRoot('usuario');
  }

}
