import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTurmaPageRoutingModule } from './add-turma-routing.module';

import { AddTurmaPage } from './add-turma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTurmaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddTurmaPage]
})
export class AddTurmaPageModule {}
