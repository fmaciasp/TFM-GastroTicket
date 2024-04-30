import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RestauranteDTO } from 'src/app/Models/restaurante';
import { AdministracionService } from 'src/app/Services/administracion.service';
import { LoginService } from 'src/app/Services/auth/login.service';

@Component({
  selector: 'app-restaurante-listado',
  templateUrl: './restaurante-listado.component.html',
  styleUrls: ['./restaurante-listado.component.css']
})
export class RestauranteListadoComponent implements OnInit{

  userLoginOn:boolean=false;
  restaurantes!: RestauranteDTO[];

  constructor(
    private formBuilder: FormBuilder,
    private administracionService: AdministracionService,
    private router: Router,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn=userLoginOn;

        if(this.userLoginOn){
          this.administracionService.getRestaurantes().subscribe({
            next: (restaurantes) => {
              this.restaurantes = restaurantes;
              console.log("restaurantes: ", this.restaurantes)
            },
            error: (error) => {
              console.error('ngOnInit empresa-listado.component error', error);
            }
          });
        }
      }
    })
  }

  /*editarEmpresa(idEmpresa: number): void{
    console.log('editarEmpresa empresa-listado.component editar empresa');
  }

  eliminarEmpresa(idEmpresa: number): void{
    console.log('eliminarEmpresa empresa-listado.component eliminar empresa');
  }*/

}
