import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AeropuertosRoutingModule } from '../aeropuertos/aeropuertos-routing.module';
import { CreateComponent } from '../aeropuertos/create/create.component';
import { EditComponent } from '../aeropuertos/edit/edit.component';
import { GetComponent } from '../aeropuertos/get/get.component';
import { SeguridadRoutingModule } from '../seguridad/seguridad-routing.module';


@NgModule({
  declarations: [
   CreateComponent,
    EditComponent,
    GetComponent,
  ],
  imports: [
    CommonModule,
    AeropuertosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SeguridadRoutingModule,

  ]
})
export class AeropuertosModule { } 

