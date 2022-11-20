import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutaModel } from 'src/app/modelos/ruta.model';
import { VueloModel } from 'src/app/modelos/vuelo.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import { VueloService } from 'src/app/servicios/vuelo.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private rutaService: RutaService,
    private vueloService: VueloService,
    private router: Router) { }
     
    fgValidacionVuelo = this.fb.group({
      fecha_Inicio: ['', [Validators.required]],
      hora_Inicio: ['', [Validators.required]],
      fecha_Fin: ['', [Validators.required]],
      hora_Fin: ['', [Validators.required]],
      asientos_Vendidos: ['', [Validators.required]],
      nombre_Piloto: ['', [Validators.required]],
      ruta: ['', [Validators.required]]  
    });
  
  ngOnInit(): void {
    this.getRutas();
  }

//Variable para almacenar rutas
listadoRutas: RutaModel[] = []

  storeVuelo(){
    let vuelo = new VueloModel();
    vuelo.fecha_Inicio = this.fgValidacionVuelo.controls["fecha_Inicio"].value as string;
    vuelo.hora_Inicio = this.fgValidacionVuelo.controls["hora_Inicio"].value as string;
    vuelo.fecha_Fin = this.fgValidacionVuelo.controls["fecha_Fin"].value as string;
    vuelo.hora_Fin = this.fgValidacionVuelo.controls["hora_Fin"].value as string;
    vuelo.asientos_Vendidos= this.fgValidacionVuelo.controls["asientos_Vendidos"].value as string;
    vuelo.nombre_Piloto = this.fgValidacionVuelo.controls["nombre_Piloto"].value as string;
    vuelo.ruta = this.fgValidacionVuelo.controls["ruta"].value as string;

    this.vueloService.storeVuelo(vuelo).subscribe((data: VueloModel)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/vuelos/get']);
    },
   
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  
  }

   //Metodo para traer información 
   getRutas(){
    this.rutaService.getAllRuta().subscribe((data: RutaModel[]) => {
      this.listadoRutas = data
      console.log(data)
    })
  }
  
}
