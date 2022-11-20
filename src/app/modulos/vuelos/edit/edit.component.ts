import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaModel } from 'src/app/modelos/ruta.model';
import { VueloModel } from 'src/app/modelos/vuelo.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import { VueloService } from 'src/app/servicios/vuelo.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private rutaService: RutaService,
    private vueloService: VueloService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacionEditVuelo= this.fb.group({      
      id: ['', [Validators.required]],
      fecha_Inicio: ['', [Validators.required]],
      hora_Inicio: ['', [Validators.required]],
      fecha_Fin:  ['', [Validators.required]],
      hora_Fin: ['', [Validators.required]],
      asientos_Vendidos: ['', [Validators.required]],
      nombre_Piloto:  ['', [Validators.required]],
      ruta:  ['', [Validators.required]]  
    });
 
    id: string=''
    listadoRutas: RutaModel[] = []
//método para traer la informacion del registro: 

buscarRegistro(id: string){
    this.vueloService.getWithIdVuelo(id).subscribe((data: VueloModel) => {
    console.log(data)
    this.fgValidacionEditVuelo.controls["id"].setValue(id)
    this.fgValidacionEditVuelo.controls["fecha_Inicio"].setValue(data.fecha_Inicio as string)
    this.fgValidacionEditVuelo.controls["hora_Inicio"].setValue(data.hora_Inicio as string)
    this.fgValidacionEditVuelo.controls["fecha_Fin"].setValue(data.fecha_Fin as string)
    this.fgValidacionEditVuelo.controls["hora_Fin"].setValue(data.hora_Fin as string)
    this.fgValidacionEditVuelo.controls["asientos_Vendidos"].setValue(data.asientos_Vendidos as string)
    this.fgValidacionEditVuelo.controls["nombre_Piloto"].setValue(data.nombre_Piloto as string)
    this.fgValidacionEditVuelo.controls["ruta"].setValue(data.ruta as string)
  })
}

//metodo para editar la informacion:

editVuelo(){
  let vuelo = new VueloModel();
  vuelo.id = this.fgValidacionEditVuelo.controls["id"].value as string;
  vuelo.fecha_Inicio = this.fgValidacionEditVuelo.controls["fecha_Inicio"].value as string;
  vuelo.hora_Inicio = this.fgValidacionEditVuelo.controls["hora_Inicio"].value as string;
  vuelo.fecha_Fin = this.fgValidacionEditVuelo.controls["fecha_Fin"].value as string;
  vuelo.hora_Fin = this.fgValidacionEditVuelo.controls["hora_Fin"].value as string;
  vuelo.asientos_Vendidos = this.fgValidacionEditVuelo.controls["asientos_Vendidos"].value as string;
  vuelo.nombre_Piloto = this.fgValidacionEditVuelo.controls["nombre_Piloto"].value as string;
  vuelo.ruta = this.fgValidacionEditVuelo.controls["ruta"].value as string;

    this.vueloService.updateVuelo(vuelo).subscribe((data: VueloModel)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
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
    
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
    this.getRutas();

  }

}
