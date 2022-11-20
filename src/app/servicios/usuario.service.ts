import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../modelos/usuario.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  url = "http://localhost:3000"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { 
      this.token = this.seguridadService.getToken();
    }

 //Método para Crear un Usuario:
 store(usuario: UsuarioModel): Observable<UsuarioModel> {
  return this.http.post<UsuarioModel>(`${this.url}/usuarios`, {
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    telefono: usuario.telefono,
    correo: usuario.correo,
    password:''
  });
}

//Método para Listar todos los Usuarios:
getAll(): Observable<UsuarioModel[]>{
  return this.http.get<UsuarioModel[]>(`${this.url}/usuarios`, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}
//Método para Actualizar un Usuario:

update(usuario: UsuarioModel): Observable<UsuarioModel> {
  return this.http.patch<UsuarioModel>(`${this.url}/usuarios/${usuario.id}`, {
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    telefono: usuario.telefono,
    correo: usuario.correo
  }, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  });

  }

  //Método para Eliminar un Usuario: 

  delete(id: string): Observable<UsuarioModel[]>{
    return this.http.delete<UsuarioModel[]>(`${this.url}/usuarios/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

//Metodo para Consultar un unico Usuario: 
getWithId(id: string): Observable<UsuarioModel>{
      return this.http.get<UsuarioModel>(`${this.url}/usuarios/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getCount(): Observable<UsuarioModel[]>{
      return this.http.get<UsuarioModel[]>(`${this.url}/usuarios/count`, {
        //Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

}