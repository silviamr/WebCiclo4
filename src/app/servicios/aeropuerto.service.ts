import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AeropuertoModel } from '../modelos/aeropuerto.model';
import { SeguridadService } from './seguridad.service';


@Injectable({
  providedIn: 'root'
})
export class AeropuertoService {
  
  url = "http://localhost:3000"
  token: string = ''
  
   constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { 
      this.token = this.seguridadService.getToken();
    }

 //Método para Crear un aeropuerto:
 storeAeropuerto(aeropuerto: AeropuertoModel): Observable<AeropuertoModel> {
  return this.http.post<AeropuertoModel>(`${this.url}/aeropuertos`, {
    nombre: aeropuerto.nombre,
    ciudad: aeropuerto.ciudad,
    pais: aeropuerto.pais,
    coord_x: aeropuerto.coord_x,
    coord_y: aeropuerto.coord_y,
    siglas: aeropuerto.siglas,
    tipo: aeropuerto.tipo,
    
  });
}

//Método para Listar todos los aeropuertos:
getAllAeropuerto(): Observable<AeropuertoModel[]>{
  return this.http.get<AeropuertoModel[]>(`${this.url}/aeropuertos`, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}
//Método para Actualizar un aeropuerto:

updateAeropuerto(aeropuerto: AeropuertoModel): Observable<AeropuertoModel> {
  return this.http.patch<AeropuertoModel>(`${this.url}/aeropuertos/${aeropuerto.id}`, {
    nombre: aeropuerto.nombre,
    ciudad: aeropuerto.ciudad,
    pais:  aeropuerto.pais,
    coord_x: aeropuerto.coord_x,
    coord_y: aeropuerto.coord_y,
    siglas: aeropuerto.siglas,
    tipo: aeropuerto.tipo,
  }, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  });

  }

  //Método para Eliminar un aeropuerto: 

  deleteAeropuerto(id: string): Observable<AeropuertoModel[]>{
    return this.http.delete<AeropuertoModel[]>(`${this.url}/aeropuertos/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

//Metodo para Consultar aeropuerto: 
getWithIdAeropuerto(id: string): Observable<AeropuertoModel>{
      return this.http.get<AeropuertoModel>(`${this.url}/aeropuertos/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getCountAeropuerto(): Observable<AeropuertoModel[]>{
      return this.http.get<AeropuertoModel[]>(`${this.url}/aeropuertos/count`, {
        //Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
    getTokenAeropuerto(){let sessionData = localStorage.getItem("sessionData");
    if(sessionData){
      let data = JSON.parse(sessionData);
      return data.token;
    }
    return ''
  }
  

}