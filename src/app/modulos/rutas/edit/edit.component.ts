import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaModel } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import Swal from 'sweetalert2';
import { AeropuertoModel } from 'src/app/modelos/aeropuerto.model';
import { AeropuertoService } from 'src/app/servicios/aeropuerto.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private aeropuertoService: AeropuertoService,
    private rutaService: RutaService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacionRuta = this.fb.group({
      id: ['', [Validators.required]],
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      tiempo_Estimado: ['', [Validators.required]]

    });
 
    id: string='';
    listadoAeropuertos: AeropuertoModel[] = []
//método para traer la informacion del registro: 

buscarRegistro(id: string){
    this.rutaService.getWithIdRuta(id).subscribe((data: RutaModel) => {
    console.log(data)
    this.fgValidacionRuta.controls["id"].setValue(id)
    this.fgValidacionRuta.controls["origen"].setValue(data.origen as string)
    this.fgValidacionRuta.controls["destino"].setValue(data.destino as string)
    this.fgValidacionRuta.controls["tiempo_Estimado"].setValue(data.tiempo_Estimado as string)
  })
}

//metodo para editar la informacion:

editRuta(){
  let ruta = new RutaModel();
  ruta.id = this.fgValidacionRuta.controls["id"].value as string;
  ruta.origen = this.fgValidacionRuta.controls["origen"].value as string;
  ruta.destino = this.fgValidacionRuta.controls["destino"].value as string;
  ruta.tiempo_Estimado = this.fgValidacionRuta.controls["tiempo_Estimado"].value as string;

    this.rutaService.updateRuta(ruta).subscribe((data: RutaModel)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/rutas/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
    this.getAeropuertos();

  }

    //Metodo para traer información 
    getAeropuertos(){
      this.aeropuertoService.getAllAeropuerto().subscribe((data: AeropuertoModel[]) => {
        this.listadoAeropuertos = data
        console.log(data)
      })
    }

}
