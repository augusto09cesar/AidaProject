import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalidadePage } from './modalidade.page';

const routes: Routes = [
  {
    path: '',
    component: ModalidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalidadePageRoutingModule {}
