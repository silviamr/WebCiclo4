import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutaModel } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import Swal from 'sweetalert2';
import { AeropuertoModel } from 'src/app/modelos/aeropuerto.model';
import { AeropuertoService } from 'src/app/servicios/aeropuerto.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private aeropuertoService: AeropuertoService,
    private rutaService: RutaService,
    private router: Router) { }

    fgValidacionRuta = this.fb.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      tiempo_Estimado:  ['', [Validators.required]],
          
    });
  
  ngOnInit(): void {
    this.getAeropuertos();
  }
  
  listadoAeropuertos: AeropuertoModel[] = []

  storeRuta(){
    let ruta = new RutaModel();
    ruta.origen = this.fgValidacionRuta.controls["origen"].value as string;
    ruta.destino = this.fgValidacionRuta.controls["destino"].value as string;
    ruta.tiempo_Estimado = this.fgValidacionRuta.controls["tiempo_Estimado"].value  as string;
   
    this.rutaService.storeRuta(ruta).subscribe((data: RutaModel)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/rutas/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

  //Metodo para traer información 
  getAeropuertos(){
    this.aeropuertoService.getAllAeropuerto().subscribe((data: AeropuertoModel[]) => {
      this.listadoAeropuertos = data
      console.log(data)
    })
  }
}
