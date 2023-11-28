import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultadoJogoPage } from './resultado-jogo.page';

const routes: Routes = [
  {
    path: '',
    component: ResultadoJogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultadoJogoPageRoutingModule {}
