import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = "http://localhost:3000/usuarios"

  constructor( private http: HttpClient ) { }

  login( name: string ): Observable<Usuario[]>{
    return this.http.get<Usuario[]>( `${this.url}?q=${name}` )
  }
  
  logout(){
    localStorage.clear();
  }
}
