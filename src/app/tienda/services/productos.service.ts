import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Producto } from '../interfaces/productos.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url: string = "http://localhost:3000/productos"

  constructor( private http: HttpClient) { }

  guardarProducto( producto: Producto ): Observable<Producto> {
    return this.http.post<Producto>( this.url, producto );
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>( this.url );
  }

  eliminarProducto( id?: number ) {
    return this.http.delete(this.url + `/${id}`)
  }

  actualizarProducto( id: number, producto: Producto): Observable<Producto>{
    return this.http.put<Producto>(this.url + `/${id}`, producto);
  }
}
