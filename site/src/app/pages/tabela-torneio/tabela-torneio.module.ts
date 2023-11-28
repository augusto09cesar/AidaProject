import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabelaTorneioPageRoutingModule } from './tabela-torneio-routing.module';

import { TabelaTorneioPage } from './tabela-torneio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabelaTorneioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TabelaTorneioPage]
})
export class TabelaTorneioPageModule {}
