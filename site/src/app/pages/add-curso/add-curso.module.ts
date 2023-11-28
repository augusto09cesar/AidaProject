import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCursoPageRoutingModule } from './add-curso-routing.module';

import { AddCursoPage } from './add-curso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCursoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddCursoPage]
})
export class AddCursoPageModule {}
