import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/auth/login.service';

@Component({
  selector: 'app-permiso-denegado',
  templateUrl: './permiso-denegado.component.html',
  styleUrls: ['./permiso-denegado.component.css']
})
export class PermisoDenegadoComponent implements OnInit {

  userLoginOn:boolean=false;

  constructor(
    private loginService: LoginService,
  ){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn=userLoginOn;
      }
    })
  }

}
