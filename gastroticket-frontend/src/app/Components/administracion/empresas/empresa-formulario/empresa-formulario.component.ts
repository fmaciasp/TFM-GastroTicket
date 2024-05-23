import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { EmpresaDTO } from 'src/app/Models/empresa';
import { AdministracionService } from 'src/app/Services/administracion.service';
import { LoginService } from 'src/app/Services/auth/login.service';
import { MensajesService } from 'src/app/Services/mensajes.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-empresa-formulario',
  templateUrl: './empresa-formulario.component.html',
  styleUrls: ['./empresa-formulario.component.css']
})
export class EmpresaFormularioComponent implements OnInit {

  userLoginOn:boolean=false;
  isUpdateMode: boolean;
  empresaError: any = null;
  empresaExito: any = null;
  empresa!: EmpresaDTO;
  editEmpresa!: EmpresaDTO;
  empresaForm: FormGroup;
  modoEditar = false;
  empresaId: number | null;
  //empresa
  nombre!: FormControl;
  email!: FormControl;
  datosEmpresa: any;
  matcher = new MyErrorStateMatcher();

  constructor(
    private loginService: LoginService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private route:ActivatedRoute, 
    private administracionService: AdministracionService,
    private mensajesService: MensajesService
  ){ 
    this.isUpdateMode = false;
    this.empresaId = parseInt(this.route.snapshot.paramMap.get('id') ?? "", 10); 

    this.empresaForm = this.formBuilder.group({
      nombre:['', Validators.required],
      email:['', [Validators.required, Validators.email]]
    })

    this.nombre = this.empresaForm.get('nombre') as FormControl;
    this.email = this.empresaForm.get('email') as FormControl;
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn=userLoginOn;

        if(this.userLoginOn){
          this.route.params.subscribe(params => {
            this.empresaId = params['idEmpresa'];
            this.modoEditar = !!this.empresaId;
          })
      
          this.inicializarFormulario();
        }
        else{
          console.log("no login empresa-formulario")
        }
      }
    })
  }

  cargarDatosEmpresa() {
    if(this.empresaId == null){
      this.empresaId = -1;
    }
    this.administracionService.getEmpresa(this.empresaId).subscribe({
      next: (empresa) => {
        console.log("empresa: " + empresa.nombre);
        this.empresa = {
          id: empresa.id,
          nombre: empresa.nombre,
          email: empresa.email,
        };
        this.empresaForm = this.formBuilder.group({
          nombre: [this.empresa.nombre || '', [Validators.required]],
          email: [this.empresa.email || '', [Validators.required, Validators.email]],
        });
      },
      error: (error) => {
        console.error('cargarDatosEmpresa empresa-formulario.component error', error);
        this.empresaError = error;
      }}
    );
  }

  inicializarFormulario() {
    if (this.modoEditar) {
      this.cargarDatosEmpresa(); 
    } else {
      this.datosEmpresa = {
        nombre: '',
        email: '',
      };
    }
  }

  editarEmpresa(): void{
    const nombre = this.empresaForm.get('nombre')?.value;
    const email = this.empresaForm.get('email')?.value;

    if(this.empresaId){
      this.editEmpresa = {
          id: this.empresaId,
          nombre: nombre,
          email: email,
      };
      this.administracionService.editarEmpresa(this.editEmpresa).subscribe({
        next: (res) => {
          console.log(res);
          this.mensajesService.sendSuccessMessage(res)
          this.router.navigate(['/empresas'])
        },
        error: (error) => {
          console.error('editarEmpresa empresa-formulario.component error', error);
          this.empresaError = error;
        }
      });
    }
    else{
      this.editEmpresa = {
        id: -1,
        nombre: nombre,
        email: email,
    };
      this.administracionService.crearEmpresa(this.editEmpresa).subscribe({
        next: (res) => {
          console.log(res);
          this.mensajesService.sendSuccessMessage(res)
          this.router.navigate(['/empresas']);
        },
        error: (error) => {
          console.error('No se ha podido crear una nueva empresa', error);
          this.empresaError = error;
        }
      })
    }
  }

}
