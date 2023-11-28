import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabelaTorneioPage } from './tabela-torneio.page';

const routes: Routes = [
  {
    path: '',
    component: TabelaTorneioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabelaTorneioPageRoutingModule {}
