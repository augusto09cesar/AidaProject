import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEquipePage } from './add-equipe.page';

const routes: Routes = [
  {
    path: '',
    component: AddEquipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEquipePageRoutingModule {}
