import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTorneioPage } from './add-torneio.page';

const routes: Routes = [
  {
    path: '',
    component: AddTorneioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTorneioPageRoutingModule {}
