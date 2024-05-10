import { Component, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from '../Services/auth/registro.service';
import { RegistroRequest } from '../Services/auth/registroRequest';
import { Role } from '../Services/auth/registro';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registroError: string = "";
  registroForm = this.formBuilder.group({
    username:['', [Validators.required, Validators.email]],
    password:['', Validators.required],
    role: ['', Validators.required], 
    nombre: ['', Validators.required],
    ciudad: [''],
    direccion: ['']
  })
  mensaje: string = '';
  roles = Object.values(Role);
  selectedRole: Role | undefined; 
  matcher = new MyErrorStateMatcher();
  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;
  options: string[] = ['Albacete', 'Alicante/Alacant', 'Almería', 'Ávila', 'Badajoz', 'Barcelona', 'Bilbao', 'Burgos', 'Cáceres', 'Cádiz', 'Castellón de la Plana', 'Ceuta', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara', 'Huelva', 'Huesca', 'Jaén', 'La Coruña', 'Las Palmas de Gran Canaria', 'León', 'Lérida', 'Logroño', 'Lugo', 'Madrid', 'Málaga', 'Melilla', 'Mérida', 'Murcia', 'Orense', 'Oviedo', 'Palencia', 'Palma de Mallorca', 'Pamplona', 'Pontevedra', 'Santa Cruz de Tenerife', 'Santander', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vitoria-Gasteiz', 'Zamora', 'Zaragoza'];
  ciudades: string[];

  constructor(private formBuilder: FormBuilder, private router: Router, private registroService: RegistroService){
    this.ciudades = this.options.slice();
  }

  ngOnInit(): void {}

  get username(){
    return this.registroForm.controls.username;
  }

  get password(){
    return this.registroForm.controls.password;
  }

  get role(){
    return this.registroForm.controls.role;
  }

  get nombre(){
    return this.registroForm.controls.nombre;
  }

  public registro(){
    if(this.registroForm.valid){
      this.registroService.registro(this.registroForm.value as RegistroRequest).subscribe({
        next: (userData) => {
          console.log("userdata: ",userData);
          if(userData.role=='EMPRESA'){
            this.router.navigateByUrl("/dash-empresa");
          }
          else if(userData.role.toString()=='RESTAURANTE'){
            this.router.navigateByUrl("/dash-restaurante");
          }
          else{
            this.router.navigateByUrl("/dashboard");
          }
          this.registroForm.reset();
        },
        error: (errorData) => {
          console.error(errorData);
          this.registroError = errorData;
        },
        complete: () => {
          console.info("login completo");
        }
      });
      //comprobar qué tipo de usuario es y en función de esto redirigimos a un componente u otro
      
    }
    else{
      this.registroForm.markAllAsTouched();
    }
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.ciudades = this.options.filter(o => o.toLowerCase().includes(filterValue));
  }

}
