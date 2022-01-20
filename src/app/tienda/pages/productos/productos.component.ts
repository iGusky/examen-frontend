import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Producto } from '../../interfaces/productos.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  producto: Producto = {
    nombre:    '',
    precio:     0,
    categoria: '',
    imagen:    ''
  };

  actualizando: boolean = false;
  indice: number = 0;

  productos: Producto[] = [];


  constructor( private productoService: ProductosService ) { }

  ngOnInit(): void {
    this.productoService.obtenerProductos()
      .subscribe({
        next: ( productos ) => {
          this.productos = productos
        }
      })
  }

  guardarProducto(){
    if(this.producto.nombre === '' || this.producto.categoria === ''){
      Swal.fire({
        title: "Error",
        text: "Falta nombre o categoría",
        icon: 'error'
      });
      return;
    }
    
    this.productoService.guardarProducto( this.producto ) 
      .subscribe({
        next: ( res ) => {
          console.log(res);
          this.reiniciarFormulario();
          this.productos.push(res)
          Swal.fire({
            title: 'Guardado',
            text: `Producto guardado con el ID: ${res.id}`,
            icon: 'success' 
          })
        }
      })
  }

  eliminarProducto( id: number = -1  ){
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción no se puede revertir',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then( opcion => {
      if( opcion.isConfirmed ) {
        this.productoService.eliminarProducto(id)
        .subscribe({
          next: () => {
            this.productos = this.productos.filter( prod => {
              return prod.id !== id
            })
            Swal.fire(
              'Eliminado',
              'El elemento se ha eliminado correctamente',
              'success'
            )
          }
        })
      }
    })
   
  }

  cargarProducto( producto: Producto, indice: number ){
    this.actualizando = true
    this.producto = {...producto}
    this.indice = indice
  }
  
  actualizarProducto( producto: Producto, id: number = -1){
    if(this.producto.nombre === '' || this.producto.categoria === ''){
      Swal.fire({
        title: "Error",
        text: "Falta nombre o categoría",
        icon: 'error'
      });
      return;
    }
    this.productoService.actualizarProducto(id, producto)
      .subscribe({
        next: (res) => {
          this.actualizando = false;
          this.productos[this.indice] = res
          this.reiniciarFormulario();
          Swal.fire({
            title: 'Guardado',
            text: `Producto actualizado correctamente`,
            icon: 'success' 
          });
        }
      })
  }

  reiniciarFormulario(){
    this.actualizando = false
    this.producto = {
      nombre:    '',
      precio:     0,
      categoria: '',
      imagen:    ''
    };
  }

}
