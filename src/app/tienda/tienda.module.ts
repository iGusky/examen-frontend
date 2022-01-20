import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductosComponent } from './pages/productos/productos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductosGerenteComponent } from './pages/productos-gerente/productos-gerente.component';



@NgModule({
  declarations: [
    ProductosComponent,
    UsuariosComponent,
    LoginComponent,
    ProductosGerenteComponent
  ],
  exports: [
    ProductosComponent,
    UsuariosComponent,
    LoginComponent,
    ProductosGerenteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class TiendaModule { }
