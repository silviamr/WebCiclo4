import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from '../vuelos/edit/edit.component';
import { CreateComponent } from '../vuelos/create/create.component';
import { GetComponent } from '../vuelos/get/get.component';
import { SessionGuard } from 'src/app/guards/session.guard';


const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  },{
    path: 'edit/:id',
    canActivate: [SessionGuard],
    component: EditComponent,


  },{
    path: 'get',
    canActivate: [SessionGuard],
    component: GetComponent,

  },{
    path: '',
    pathMatch: 'full',
    redirectTo: 'get'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VuelosRoutingModule { }
