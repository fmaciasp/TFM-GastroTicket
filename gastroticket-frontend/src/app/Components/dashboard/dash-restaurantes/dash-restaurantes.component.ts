import { Component } from '@angular/core';
import { LoginService } from 'src/app/Services/auth/login.service';

@Component({
  selector: 'app-dash-restaurantes',
  templateUrl: './dash-restaurantes.component.html',
  styleUrls: ['./dash-restaurantes.component.css']
})
export class DashRestaurantesComponent {

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
