import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTorneioPageRoutingModule } from './add-torneio-routing.module';

import { AddTorneioPage } from './add-torneio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTorneioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddTorneioPage]
})
export class AddTorneioPageModule {}
