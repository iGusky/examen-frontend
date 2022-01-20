import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../../interfaces/usuarios.interface';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario: Usuario = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    permisos: 'Ventas'
  };

  indice : number = 0;
  actualizando: boolean = false;
  usuarios: Usuario[] = [];

  constructor( private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios()
      .subscribe({
        next: (res) => {
          this.usuarios = res
        }
      })
  }

  guardarUsuario() {
    this.usuarioService.guardarUsuario( this.usuario )
      .subscribe({
        next: (res) => {
          Swal.fire(
            'Exito',
            'Usuario guardado correctamente',
            'success'
          )
          this.usuarios.push(res)
          this.reiniciarFormulario()
        }
      })
  }

  cargarUsuario( usuario: Usuario, indice: number ) {
    this.usuario = {...usuario};
    this.indice = indice; 
    this.actualizando = true;
  }

  actualizarUsuario( id: number = 0 ) {
    this.usuarioService.actualizarUsuario( id, this.usuario )
      .subscribe({
        next: res => {
          this.usuarios[this.indice] = res;
          this.reiniciarFormulario();
        }
      })
  }

  eliminarUsuario( id: number = 0 ) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción no se puede revertir',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then( opcion => {
      if( opcion.isConfirmed ) {
        this.usuarioService.eliminarUsuario(id)
        .subscribe({
          next: () => {
            this.usuarios = this.usuarios.filter( usuario => {
              return usuario.id !== id
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

  reiniciarFormulario(){
    this.actualizando = false;
    this.usuario = {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      permisos: 'Ventas'
    }
  }

}
