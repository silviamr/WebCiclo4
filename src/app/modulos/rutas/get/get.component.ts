import { Component, OnInit } from '@angular/core';
import { RutaModel } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private rutaService: RutaService) { }
  listado: RutaModel[] = []

  ngOnInit(): void {
    this.getAllRuta()

  }

  //traer información y eliminar información
  getAllRuta(){
    this.rutaService.getAllRuta().subscribe((data: RutaModel[]) => {
      this.listado = data
      console.log(data)
    })
  }
 
  deleteRuta(id?: any){
    console.log(id)
    Swal.fire({
      title: '¿Esta seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rutaService.deleteRuta(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success')
          this.getAllRuta();
        })
      }
    })
  }

}
