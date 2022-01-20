import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../tienda/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  sesion: boolean = false

  constructor( private router: Router, private loginService: LoginService ) { }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.logout();
    this.sesion = false;
    this.router.navigate(['login'])
  }

}
