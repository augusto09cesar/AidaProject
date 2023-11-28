import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then(m => m.UsuarioPageModule)
  },
  {
    path: 'add-usuario',
    loadChildren: () => import('./pages/add-usuario/add-usuario.module').then(m => m.AddUsuarioPageModule)
  },
  {
    path: 'atleta',
    loadChildren: () => import('./pages/atleta/atleta.module').then(m => m.AtletaPageModule)
  },
  {
    path: 'add-atleta',
    loadChildren: () => import('./pages/add-atleta/add-atleta.module').then(m => m.AddAtletaPageModule)
  },
  {
    path: 'add-atleta/:idAtleta',
    loadChildren: () => import('./pages/add-atleta/add-atleta.module').then(m => m.AddAtletaPageModule)
  },
  {
    path: 'equipe',
    loadChildren: () => import('./pages/equipe/equipe.module').then(m => m.EquipePageModule)
  },
  {
    path: 'add-equipe',
    loadChildren: () => import('./pages/add-equipe/add-equipe.module').then(m => m.AddEquipePageModule)
  },
  {
    path: 'add-equipe/:idEquipe',
    loadChildren: () => import('./pages/add-equipe/add-equipe.module').then(m => m.AddEquipePageModule)
  },
  {
    path: 'modalidade',
    loadChildren: () => import('./pages/modalidade/modalidade.module').then(m => m.ModalidadePageModule)
  },
  {
    path: 'add-modalidade',
    loadChildren: () => import('./pages/add-modalidade/add-modalidade.module').then(m => m.AddModalidadePageModule)
  },
  {
    path: 'add-modalidade/:idModalidade',
    loadChildren: () => import('./pages/add-modalidade/add-modalidade.module').then(m => m.AddModalidadePageModule)
  },
  {
    path: 'lista-atleta',
    loadChildren: () => import('./pages/lista-atleta/lista-atleta.module').then(m => m.ListaAtletaPageModule)
  },
  {
    path: 'add-torneio',
    loadChildren: () => import('./pages/add-torneio/add-torneio.module').then(m => m.AddTorneioPageModule)
  },
  {
    path: 'add-torneio/:idTorneio',
    loadChildren: () => import('./pages/add-torneio/add-torneio.module').then(m => m.AddTorneioPageModule)
  },
  {
    path: 'torneio',
    loadChildren: () => import('./pages/torneio/torneio.module').then(m => m.TorneioPageModule)
  },
  {
    path: 'recuperar-senha',
    loadChildren: () => import('./pages/recuperar-senha/recuperar-senha.module').then(m => m.RecuperarSenhaPageModule)
  },

  {
    path: 'turma',
    loadChildren: () => import('./pages/turma/turma.module').then(m => m.TurmaPageModule)
  },
  {
    path: 'curso',
    loadChildren: () => import('./pages/curso/curso.module').then(m => m.CursoPageModule)
  },
  {
    path: 'meus-dados',
    loadChildren: () => import('./pages/meus-dados/meus-dados.module').then(m => m.MeusDadosPageModule)
  },
  {
    path: 'add-turma',
    loadChildren: () => import('./pages/add-turma/add-turma.module').then(m => m.AddTurmaPageModule)
  },
  {
    path: 'add-turma/:id',
    loadChildren: () => import('./pages/add-turma/add-turma.module').then(m => m.AddTurmaPageModule)
  },
  {
    path: 'add-curso/:id',
    loadChildren: () => import('./pages/add-curso/add-curso.module').then(m => m.AddCursoPageModule)
  },
  {
    path: 'add-curso',
    loadChildren: () => import('./pages/add-curso/add-curso.module').then(m => m.AddCursoPageModule)
  },
  {
    path: 'tabela-torneio',
    loadChildren: () => import('./pages/tabela-torneio/tabela-torneio.module').then(m => m.TabelaTorneioPageModule)
  },
  {
    path: 'tabela-torneio/:id',
    loadChildren: () => import('./pages/tabela-torneio/tabela-torneio.module').then(m => m.TabelaTorneioPageModule)
  },
  {
    path: 'resultado-jogo',
    loadChildren: () => import('./pages/resultado-jogo/resultado-jogo.module').then(m => m.ResultadoJogoPageModule)
  }, {
    path: 'resultado-jogo/:id',
    loadChildren: () => import('./pages/resultado-jogo/resultado-jogo.module').then(m => m.ResultadoJogoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
