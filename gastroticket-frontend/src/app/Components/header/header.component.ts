import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { LoginService } from 'src/app/Services/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLoginOn: boolean = false;
  constructor(private loginService: LoginService, private router:Router){}

  ngOnInit(): void {
      this.loginService.currentUserLoginOn
      .pipe(
        catchError(error => {
          throw error;
        })
      )
      .subscribe({
        next:(userLoginOn)=>{
          this.userLoginOn=userLoginOn;
        },
        error: (error) => {
          this.userLoginOn = false;
        }
      })
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/inicio'])
  }

}
