import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpresaDTO } from 'src/app/Models/empresa';
import { AdministracionService } from 'src/app/Services/administracion.service';
import { LoginService } from 'src/app/Services/auth/login.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-empresa-formulario',
  templateUrl: './empresa-formulario.component.html',
  styleUrls: ['./empresa-formulario.component.css']
})
export class EmpresaFormularioComponent implements OnInit {

  userLoginOn:boolean=false;
  empresaError: string = "";
  empresa!: EmpresaDTO;
  empresaForm = this.formBuilder.group({
    nombre:['', Validators.required],
    email:['', [Validators.required, Validators.email]]
  })
  modoEditar = false;
  id = 0;
  datosEmpresa: any;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router, private route:ActivatedRoute, private administracionService: AdministracionService){ }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn=userLoginOn;

        if(this.userLoginOn){
          this.route.params.subscribe(params => {
            this.id = params['idEmpresa'];
            this.modoEditar = !!this.id;
          })
      
          this.inicializarFormulario();
        }
        else{
          console.log("no login empresa-formulario")
        }
      }
    })
  }

  get nombre(){
    return this.empresaForm.controls.nombre;
  }

  get email(){
    return this.empresaForm.controls.email;
  }

  cargarDatosEmpresa() {
    this.administracionService.getEmpresa(this.id).subscribe({
      next: (empresa) => {
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
        console.error('cargarDatosEmpresa empresa-listado.component error', error);
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

  /*empresa: EmpresaDTO;
  empresaId: number;
  nombre: FormControl;
  email: FormControl;
  empresaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private router: Router
  ){
    this.empresaId = this.activatedRoute.snapshot.paramMap.get('id');

    this.empresa = 
    this.nombre = new FormControl(this.)
  }*/

  /*ngOnInit(): void {
    this.nombre = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.required);

    this.empresaForm = this.formBuilder.group({
      nombre: this.nombre,
      email: this.email
    });
  }*/



}
