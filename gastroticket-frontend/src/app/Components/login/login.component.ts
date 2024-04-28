import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/auth/login.service';
import { LoginRequest } from 'src/app/Services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError: string = "";
  loginForm = this.formBuilder.group({
    username:['', [Validators.required, Validators.email]],
    password:['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService){}

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  get username(){
    return this.loginForm.controls.username;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  public login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
          this.router.navigateByUrl("/dashboard");
          this.loginForm.reset();
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          console.info("login completo");
        }
      });
      //comprobar qué tipo de usuario es y en función de esto redirigimos a un componente u otro
      
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }

}
