import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VueloModel } from '../modelos/vuelo.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class VueloService {
  
  url = "http://localhost:3000"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { 
      this.token = this.seguridadService.getToken();
    }

 //Método para Crear un Vuelo:
 storeVuelo(vuelo: VueloModel): Observable<VueloModel> {
  return this.http.post<VueloModel>(`${this.url}/vuelos`, {    
      fecha_Inicio: vuelo.fecha_Inicio,
      hora_Inicio: vuelo.hora_Inicio,
      fecha_Fin: vuelo.fecha_Fin,
      hora_Fin: vuelo.hora_Fin,
      asientos_Vendidos: vuelo.asientos_Vendidos,
      nombre_Piloto: vuelo.nombre_Piloto,
      ruta: vuelo.ruta 
  },
  {
    // Le paso el token a la solicitud
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  }
  
  );
  
}

//Método para Listar todos los Vuelos:
getAllVuelo(): Observable<VueloModel[]>{
  return this.http.get<VueloModel[]>(`${this.url}/vuelos`, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}
//Método para Actualizar un Vuelo:

updateVuelo(vuelo: VueloModel): Observable<VueloModel> {
  return this.http.patch<VueloModel>(`${this.url}/vuelos/${vuelo.id}`, {   
    fecha_Inicio: vuelo.fecha_Inicio,
    hora_Inicio: vuelo.hora_Inicio,
    fecha_Fin: vuelo. fecha_Fin,
    hora_Fin: vuelo.hora_Fin,
    asientos_Vendidos: vuelo.asientos_Vendidos,
    nombre_Piloto: vuelo.nombre_Piloto,
    ruta: vuelo.ruta
    
  }, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  });

  }
  //Método para Eliminar un Vuelo: 

  deleteVuelo(id: string): Observable<VueloModel[]>{
    return this.http.delete<VueloModel[]>(`${this.url}/vuelos/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

//Metodo para Consultar un unico Vuelo: 
getWithIdVuelo(id: string): Observable<VueloModel>{
      return this.http.get<VueloModel>(`${this.url}/vuelos/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getCountVuelo(): Observable<VueloModel[]>{
      return this.http.get<VueloModel[]>(`${this.url}/vuelos/count`, {
        //Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
}