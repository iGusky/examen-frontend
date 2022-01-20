import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './tienda/pages/productos/productos.component';
import { UsuariosComponent } from './tienda/pages/usuarios/usuarios.component';
import { LoginComponent } from './tienda/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: ProductosComponent,
    pathMatch: 'full'
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
