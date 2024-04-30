import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/auth/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  userLoginOn: boolean = false;
  constructor(private loginService: LoginService, private router:Router){}

  ngOnInit(): void {
      this.loginService.currentUserLoginOn.subscribe({
        next:(userLoginOn)=>{
          this.userLoginOn=userLoginOn;
        }
      })
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/inicio'])
  }

}
