import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AeropuertoModel } from 'src/app/modelos/aeropuerto.model';
import { AeropuertoService } from 'src/app/servicios/aeropuerto.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private aeropuertoService: AeropuertoService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacionEditAeropuerto = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      coord_x: ['', [Validators.required]],
      coord_y: ['', [Validators.required]],
      siglas: ['', [Validators.required]],
      tipo: ['', [Validators.required]],      

    });
 
    id: string=''
//método para traer la informacion del registro: 

buscarRegistroAeropuerto(id: string){
    this.aeropuertoService.getWithIdAeropuerto(id).subscribe((data: AeropuertoModel) => {
    console.log(data)
    this.fgValidacionEditAeropuerto.controls["id"].setValue(id)
    this.fgValidacionEditAeropuerto.controls["nombre"].setValue(data.nombre as string)
    this.fgValidacionEditAeropuerto.controls["ciudad"].setValue(data.ciudad as string)
    this.fgValidacionEditAeropuerto.controls["pais"].setValue(data.pais as string)
    this.fgValidacionEditAeropuerto.controls["coord_x"].setValue(data.coord_x as string)
    this.fgValidacionEditAeropuerto.controls["coord_y"].setValue(data.coord_y as string)
    this.fgValidacionEditAeropuerto.controls["siglas"].setValue(data.siglas as string)
    this.fgValidacionEditAeropuerto.controls["tipo"].setValue(data.tipo as string)

  })
}

//metodo para editar la informacion:

editAeropuerto(){
  let aeropuerto = new AeropuertoModel();
  aeropuerto.id = this.fgValidacionEditAeropuerto.controls["id"].value as string;
  aeropuerto.nombre = this.fgValidacionEditAeropuerto.controls["nombre"].value as string;
  aeropuerto.ciudad = this.fgValidacionEditAeropuerto.controls["ciudad"].value as string;
  aeropuerto.pais = this.fgValidacionEditAeropuerto.controls["pais"].value as string;
  aeropuerto.coord_x = this.fgValidacionEditAeropuerto.controls["coord_x"].value as string;
  aeropuerto.coord_y = this.fgValidacionEditAeropuerto.controls["coord_y"].value as string;
  aeropuerto.siglas = this.fgValidacionEditAeropuerto.controls["siglas"].value as string;
  aeropuerto.tipo = this.fgValidacionEditAeropuerto.controls["tipo"].value as string;

    this.aeropuertoService.updateAeropuerto(aeropuerto).subscribe((data: AeropuertoModel)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/aeropuertos/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistroAeropuerto(this.id);

  }

}
