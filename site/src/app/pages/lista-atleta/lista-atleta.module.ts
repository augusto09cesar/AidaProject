import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAtletaPageRoutingModule } from './lista-atleta-routing.module';

import { ListaAtletaPage } from './lista-atleta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAtletaPageRoutingModule
  ],
  declarations: [ListaAtletaPage]
})
export class ListaAtletaPageModule {}
