import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email:['', [Validators.required, Validators.email]],
    password:['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private router: Router){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  get email(){
    return this.loginForm.controls.email;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      console.log("Llamar al servicio de login");
      //comprobar qué tipo de usuario es y en función de esto redirigimos a un componente u otro
      this.router.navigateByUrl("/restaurantes");
      this.loginForm.reset();
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }

}
