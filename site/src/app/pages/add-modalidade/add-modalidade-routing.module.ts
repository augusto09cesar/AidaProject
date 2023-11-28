import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddModalidadePage } from './add-modalidade.page';

const routes: Routes = [
  {
    path: '',
    component: AddModalidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddModalidadePageRoutingModule {}
