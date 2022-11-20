import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from '../vuelos/create/create.component';
import { EditComponent } from '../vuelos/edit/edit.component';
import { GetComponent } from '../vuelos/get/get.component';
import { SeguridadRoutingModule } from '../seguridad/seguridad-routing.module';
import { VuelosRoutingModule } from './vuelos-routing.module';


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    GetComponent,
  ],
  imports: [
    CommonModule,
    VuelosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SeguridadRoutingModule,

  ]
})
export class VuelosModule { } 

