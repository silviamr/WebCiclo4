import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RutaModel } from '../modelos/ruta.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class RutaService {
  
  url = "http://localhost:3000"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { 
      this.token = this.seguridadService.getToken();
    }

 //Método para Crear una Ruta:
 storeRuta(ruta: RutaModel): Observable<RutaModel> {
  return this.http.post<RutaModel>(`${this.url}/rutas`, {
    origen: ruta.origen,
    destino: ruta.destino,
    tiempo_Estimado: ruta.tiempo_Estimado,
  
  });
}

//Método para Listar todos los vuelos:
getAllRuta(): Observable<RutaModel[]>{
  return this.http.get<RutaModel[]>(`${this.url}/rutas`, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}
//Método para Actualizar un Usuario:

updateRuta(ruta: RutaModel): Observable<RutaModel> {
  return this.http.patch<RutaModel>(`${this.url}/rutas/${ruta.id}`, {
    origen: ruta.origen,
    destino: ruta.destino,
    tiempo_Estimado: ruta.tiempo_Estimado,

  }, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  });

  }

  //Método para Eliminar un Vuelo: 

  deleteRuta(id: string): Observable<RutaModel[]>{
    return this.http.delete<RutaModel[]>(`${this.url}/rutas/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

//Metodo para Consultar un Vuelo: 
getWithIdRuta(id: string): Observable<RutaModel>{
      return this.http.get<RutaModel>(`${this.url}/rutas/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getCountRuta(): Observable<RutaModel[]>{
      return this.http.get<RutaModel[]>(`${this.url}/rutas/count`, {
        //Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

}