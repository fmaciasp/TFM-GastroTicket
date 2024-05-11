import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/auth/login.service';
import { LoginRequest } from 'src/app/Services/auth/loginRequest';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService){}

  ngOnInit(): void {}

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
          console.log("userdata: ",userData);
          if(userData.role=='ADMIN'){
            this.router.navigateByUrl("/empresas");
          }
          else if(userData.role=='EMPRESA'){
            this.router.navigateByUrl("/dash-empresa");
          }
          else if(userData.role=='RESTAURANTE'){
            this.router.navigateByUrl("/dash-restaurante");
          }
          else if(userData.role=='EMPLEADO'){
            this.router.navigateByUrl("/mis-cupones");
          }
          else{
            this.router.navigateByUrl("/dashboard");
          }
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
      
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }

}
