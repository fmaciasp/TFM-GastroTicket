import { Component } from '@angular/core';
import { LoginService } from './Services/auth/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gastroticket-frontend';

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
