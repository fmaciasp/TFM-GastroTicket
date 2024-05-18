import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { RestauranteDTO } from 'src/app/Models/restaurante';
import { AdministracionService } from 'src/app/Services/administracion.service';
import { LoginService } from 'src/app/Services/auth/login.service';
import { MyErrorStateMatcher } from '../../empresas/empresa-formulario/empresa-formulario.component';
import { MensajesService } from 'src/app/Services/mensajes.service';

@Component({
  selector: 'app-restaurante-formulario',
  templateUrl: './restaurante-formulario.component.html',
  styleUrls: ['./restaurante-formulario.component.css']
})
export class RestauranteFormularioComponent {

  userLoginOn:boolean=false;
  isUpdateMode: boolean;
  restauranteError: string = "";
  restaurante!: RestauranteDTO;
  editRestaurante!: RestauranteDTO;
  restauranteForm: FormGroup;
  modoEditar = false;
  restauranteId: number | null;
  //restaurante
  nombre!: FormControl;
  email!: FormControl;
  ciudad!: FormControl;
  direccion!: FormControl;
  datosRestaurante: any;
  matcher = new MyErrorStateMatcher();
  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;
  options: string[] = ['Albacete', 'Alicante/Alacant', 'Almería', 'Ávila', 'Badajoz', 'Barcelona', 'Bilbao', 'Burgos', 'Cáceres', 'Cádiz', 'Castellón de la Plana', 'Ceuta', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara', 'Huelva', 'Huesca', 'Jaén', 'La Coruña', 'Las Palmas de Gran Canaria', 'León', 'Lérida', 'Logroño', 'Lugo', 'Madrid', 'Málaga', 'Melilla', 'Mérida', 'Murcia', 'Orense', 'Oviedo', 'Palencia', 'Palma de Mallorca', 'Pamplona', 'Pontevedra', 'Santa Cruz de Tenerife', 'Santander', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vitoria-Gasteiz', 'Zamora', 'Zaragoza'];
  ciudades: string[];

  constructor(
    private loginService: LoginService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private route:ActivatedRoute, 
    private administracionService: AdministracionService,
    private mensajesService: MensajesService
  ){ 
    this.isUpdateMode = false;
    this.ciudades = this.options.slice();
    this.restauranteId = parseInt(this.route.snapshot.paramMap.get('id') ?? "", 10); 

    this.restauranteForm = this.formBuilder.group({
      nombre:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      ciudad:['', Validators.required],
      direccion:[''],
    })

    this.nombre = this.restauranteForm.get('nombre') as FormControl;
    this.email = this.restauranteForm.get('email') as FormControl;
    this.ciudad = this.restauranteForm.get('ciudad') as FormControl;
    this.direccion = this.restauranteForm.get('direccion') as FormControl;
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn=userLoginOn;

        if(this.userLoginOn){
          this.route.params.subscribe(params => {
            this.restauranteId = params['idRestaurante'];
            this.modoEditar = !!this.restauranteId;
          })
      
          this.inicializarFormulario();
        }
        else{
          console.log("no login restaurante-formulario")
        }
      }
    })
  }

  cargarDatosRestaurante() {
    if(this.restauranteId == null){
      this.restauranteId = -1;
    }
    this.administracionService.getRestaurante(this.restauranteId).subscribe({
      next: (restaurante) => {
        console.log("restaurante: " + restaurante.nombre);
        this.restaurante = {
          id: restaurante.id,
          nombre: restaurante.nombre,
          correo: restaurante.correo,
          ciudad: restaurante.ciudad,
          direccion: restaurante.direccion,
          userId: restaurante.userId
        };
        this.restauranteForm = this.formBuilder.group({
          nombre: [this.restaurante.nombre || '', [Validators.required]],
          email: [this.restaurante.correo || '', [Validators.required, Validators.email]],
          ciudad: [this.restaurante.ciudad || '', [Validators.required]],
          direccion: [this.restaurante.direccion || '', []],
        });
      },
      error: (error) => {
        console.error('cargarDatosRestaurante restaurante-formulario.component error', error);
      }}
    );
  }

  inicializarFormulario() {
    if (this.modoEditar) {
      this.cargarDatosRestaurante(); 
    } else {
      this.datosRestaurante = {
        nombre: '',
        email: '',
        ciudad: '',
        direccion: ''
      };
    }
  }

  editarRestaurante(): void{
    const nombre = this.restauranteForm.get('nombre')?.value;
    const email = this.restauranteForm.get('email')?.value;
    const ciudad = this.restauranteForm.get('ciudad')?.value;
    const direccion = this.restauranteForm.get('direccion')?.value;
    const userId = this.restauranteForm.get('userId')?.value;

    if(this.restauranteId){
      console.log("nombre: " + nombre)
      this.editRestaurante = {
          id: this.restauranteId,
          nombre: nombre,
          correo: email,
          ciudad: ciudad,
          direccion: direccion,
          userId: userId
      };
      this.administracionService.editarRestaurante(this.editRestaurante).subscribe({
        next: (res) => {
          console.log("res: "+res);
          this.mensajesService.sendSuccessMessage(res)
          this.router.navigate(['/restaurantes'])
        },
        error: (error) => {
          console.error('editarRestaurante restaurante-formulario.component error', error);
          this.restauranteError = error.error;
        }
      });
    }
    else{
      this.editRestaurante = {
        id: -1,
        nombre: nombre,
        correo: email,
        ciudad: ciudad,
        direccion: direccion,
        userId: userId
    };
      this.administracionService.crearRestaurante(this.editRestaurante).subscribe({
        next: (res) => {
          console.log(res);
          this.mensajesService.sendSuccessMessage(res)
          this.router.navigate(['/restaurantes']);
        },
        error: (error) => {
          console.error('No se ha podido crear una nueva restaurante', error);
          this.restauranteError = error.error;
        }
      })
    }
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.ciudades = this.options.filter(o => o.toLowerCase().includes(filterValue));
  }

}
