import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RutasRoutingModule } from '../rutas/rutas-routing.module';
import { CreateComponent } from '../rutas/create/create.component';
import { EditComponent } from '../rutas/edit/edit.component';
import { GetComponent } from '../rutas/get/get.component';
import { SeguridadRoutingModule } from '../seguridad/seguridad-routing.module';



@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    GetComponent,
  ],
  imports: [
    CommonModule,
    RutasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SeguridadRoutingModule,

  ]
})
export class RutasModule { } 

