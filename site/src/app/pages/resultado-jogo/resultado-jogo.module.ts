import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultadoJogoPageRoutingModule } from './resultado-jogo-routing.module';

import { ResultadoJogoPage } from './resultado-jogo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultadoJogoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ResultadoJogoPage]
})
export class ResultadoJogoPageModule {}
