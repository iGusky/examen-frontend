import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = "http://localhost:3000/usuarios"

  constructor( private http: HttpClient ) { }

  guardarUsuario( usuario: Usuario ): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, usuario);
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>( this.url )
  }

  actualizarUsuario( id: number, usuario: Usuario ): Observable<Usuario> {
    return this.http.put<Usuario>( `${this.url}/${id}`, usuario );
  }

  eliminarUsuario( id: number ) {
    return this.http.delete( `${this.url}/${id}` );
  }
}
