import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/auth/login.service';

@Component({
  selector: 'app-dash-empresas',
  templateUrl: './dash-empresas.component.html',
  styleUrls: ['./dash-empresas.component.css']
})
export class DashEmpresasComponent implements OnInit {

  userLoginOn:boolean=false;
  constructor(private loginService: LoginService){ }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn=userLoginOn;
      }
    })
  }

}
