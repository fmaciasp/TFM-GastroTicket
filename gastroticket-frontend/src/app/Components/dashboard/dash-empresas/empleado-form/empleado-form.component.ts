import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { EmpleadoDTO } from 'src/app/Models/empleado';
import { AdministracionService } from 'src/app/Services/administracion.service';
import { LoginService } from 'src/app/Services/auth/login.service';
import { EmpresaService } from 'src/app/Services/empresa.service';
import { MensajesService } from 'src/app/Services/mensajes.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {

  userLoginOn:boolean=false;
  currentUserId: string = "";
  isUpdateMode: boolean;
  empleadoError: string = "";
  empleadoExito: string = "";
  empleado!: EmpleadoDTO;
  editEmpleado!: EmpleadoDTO;
  empleadoForm: FormGroup;
  modoEditar = false;
  empleadoId: number | null;
  empresaId!: number;
  //empleado
  nombre!: FormControl;
  apellidos!: FormControl;
  email!: FormControl;
  telefono!: FormControl;
  datosEmpleado: any;
  matcher = new MyErrorStateMatcher();

  constructor(
    private loginService: LoginService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private route:ActivatedRoute, 
    private empresaService: EmpresaService,
    private mensajesService: MensajesService,
    private administracionService: AdministracionService
  ){ 
    this.isUpdateMode = false;
    this.empleadoId = parseInt(this.route.snapshot.paramMap.get('id') ?? "", 10); 

    this.empleadoForm = this.formBuilder.group({
      nombre:['', Validators.required],
      apellidos:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern(/^[6-7]\d{8}$/)]]
    })

    this.nombre = this.empleadoForm.get('nombre') as FormControl;
    this.apellidos = this.empleadoForm.get('apellidos') as FormControl;
    this.email = this.empleadoForm.get('email') as FormControl;
    this.telefono = this.empleadoForm.get('telefono') as FormControl;
  }

  ngOnInit(): void {

    this.loginService.currentUserId.subscribe({
      next:(userLoginId)=>{
        console.log("userLoginId: " + userLoginId);
        this.administracionService.getEmpresaPorUserId(parseInt(userLoginId)).subscribe({
          next: (empresa) => {
            this.empresaId = empresa.id;
            console.log("empresaId: " + this.empresaId);
        }
        }
        )}
    })
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn=userLoginOn;

        if(this.userLoginOn){
          this.route.params.subscribe(params => {
            this.empleadoId = params['idEmpleado'];
            this.modoEditar = !!this.empleadoId;
          })
      
          this.inicializarFormulario();
        }
        else{
          console.log("no login empleado-formulario")
        }
      }
    })
  }

  cargarDatosEmpleado() {
    if(this.empleadoId == null){
      this.empleadoId = -1;
    }
    this.empresaService.getEmpleado(this.empleadoId).subscribe({
      next: (empleado) => {
        console.log("empleado: " + empleado.nombre);
        this.empleado = {
          id: empleado.id,
          nombre: empleado.nombre,
          apellidos: empleado.apellidos,
          email: empleado.email,
          telefono: empleado.telefono,
          empresaId: empleado.empresaId,
          userId: empleado.userId
        };
        this.empleadoForm = this.formBuilder.group({
          nombre: [this.empleado.nombre || '', [Validators.required]],
          apellidos: [this.empleado.apellidos || '', [Validators.required]],
          email: [this.empleado.email || '', [Validators.required, Validators.email]],
          telefono: [this.empleado.telefono || ''],
        });
      },
      error: (error) => {
        console.error('cargarDatosEmpleado empleado-formulario.component error', error);
        this.empleadoError = error;
      }}
    );
  }

  inicializarFormulario() {
    if (this.modoEditar) {
      this.cargarDatosEmpleado();
    } else {
      this.datosEmpleado = {
        nombre: '',
        apellidos: '',
        email: '',
        telefono: ''
      };
    }
  }

  editarEmpleado(): void{
    const nombre = this.empleadoForm.get('nombre')?.value;
    const apellidos = this.empleadoForm.get('apellidos')?.value;
    const email = this.empleadoForm.get('email')?.value;
    const telefono = this.empleadoForm.get('telefono')?.value;
    const userId = this.empleadoForm.get('userId')?.value;

    if(this.empleadoId){
      this.editEmpleado = {
          id: this.empleadoId,
          nombre: nombre,
          apellidos: apellidos,
          email: email,
          telefono: telefono,
          empresaId: this.empresaId,
          userId: userId
      };
      this.empresaService.editarEmpleado(this.editEmpleado).subscribe({
        next: (res) => {
          console.log(res);
          this.mensajesService.sendSuccessMessage(res)
          this.router.navigate(['/dash-empresa'])
        },
        error: (error) => {
          console.error('editarEmpresa empleado-formulario.component error', error);
          this.empleadoError = error;
        }
      });
    }
    else{
      this.editEmpleado = {
        id: -1,
        nombre: nombre,
        email: email,
        apellidos: apellidos,
        telefono: telefono,
        empresaId: this.empresaId,
        userId: userId
    };
      this.empresaService.crearEmpleado(this.editEmpleado).subscribe({
        next: (res) => {
          console.log(res);
          this.empleadoExito = res;
          this.router.navigate(['/dash-empresa']);
        },
        error: (error) => {
          console.error('No se ha podido crear un nuevo empleado', error);
          this.empleadoError = error;
        }
      })
    }
  }

}
