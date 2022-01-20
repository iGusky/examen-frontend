import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  nombre: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    if (this.nombre === '') {
      Swal.fire('Error', 'Ingrese un nombre de usuario', 'error');
      return;
    }
    this.loginService.login(this.nombre).subscribe({
      next: (res) => {
        if (res.length > 0) {
          localStorage.setItem('nombre', res[0].nombre);
          localStorage.setItem('permisos', res[0].permisos);
          Swal.fire('Exito', 'Ha iniciado sesión correctamente', 'success');
          this.router.navigate(['']);
          return;
        }
        Swal.fire('Error', 'Usuario no registrado', 'error');
      },
      
    });
  }
}
