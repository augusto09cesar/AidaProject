import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddModalidadePageRoutingModule } from './add-modalidade-routing.module';

import { AddModalidadePage } from './add-modalidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddModalidadePageRoutingModule
  ],
  declarations: [AddModalidadePage]
})
export class AddModalidadePageModule {}
