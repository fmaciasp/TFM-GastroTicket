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
  isUpdateMode: boolean;
  empresaError: string = "";
  empresa!: EmpresaDTO;
  editEmpresa!: EmpresaDTO;
  empresaForm: FormGroup;
  modoEditar = false;
  empresaId: number | null;
  //empresa
  nombre!: FormControl;
  email!: FormControl;
  datosEmpresa: any;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router, private route:ActivatedRoute, private administracionService: AdministracionService){ 
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
          this.router.navigate(['/empresas']);
        },
        error: (error) => {
          console.error('editarEmpresa empresa-formulario.component error', error);
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
          this.router.navigate(['/empresas']);
        },
        error: (error) => {
          console.error('No se ha podido crear una nueva empresa', error);
        }
      })
    }
  }

}
