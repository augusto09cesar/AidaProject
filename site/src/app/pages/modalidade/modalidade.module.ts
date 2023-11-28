import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalidadePageRoutingModule } from './modalidade-routing.module';

import { ModalidadePage } from './modalidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ModalidadePageRoutingModule
  ],
  declarations: [ModalidadePage]
})
export class ModalidadePageModule {}
