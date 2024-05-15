import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivateRequest } from 'src/app/Services/auth/ActivateRequest';
import { RegistroService } from 'src/app/Services/auth/registro.service';
import { MensajesService } from 'src/app/Services/mensajes.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-activar-cuenta',
  templateUrl: './activar-cuenta.component.html',
  styleUrls: ['./activar-cuenta.component.css']
})
export class ActivarCuentaComponent {

  activarError: string = "";
  password!: string;
  confirmPassword!: string;
  activarForm = this.formBuilder.group({
    password:['', Validators.required],
    confirmPassword:['', Validators.required]
  })
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private registroService: RegistroService, 
    private route: ActivatedRoute,
    private mensajesService: MensajesService
  ){}

  ngOnInit(): void {
    this.mensajesService.getErrorMessage().subscribe(mensaje => {
      this.activarError = mensaje;
    });
  }

  public activarCuenta(){
    if (this.activarForm.valid) {
      const password = this.activarForm.value.password;
      const confirmPassword = this.activarForm.value.confirmPassword;

      if (password !== confirmPassword) {
        this.activarError = "Las contraseñas no coinciden";
        return;
      }

      const token = this.route.snapshot.queryParamMap.get('token');

      if (!token) {
        console.error("No se encontró el token en la URL");
        return;
      }

      if (password !== confirmPassword || password == null) {
        this.activarError = "Las contraseñas no coinciden";
        return;
      }

      const activateRequest: ActivateRequest = { token: token, password: password };

      this.registroService.activate(activateRequest).subscribe({
        next: () => {
          console.log("Cuenta activada correctamente");
          this.mensajesService.sendSuccessMessage("Cuenta activada correctamente. Por favor inicie sesión.")
          this.router.navigate(['/login'])
        },
        error: (error) => {
          console.error("Error al activar la cuenta", error);
          this.activarError = error;
        }
      });
    } else {
      this.activarForm.markAllAsTouched();
    }
  }

}
