import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RestauranteDTO } from 'src/app/Models/restaurante';
import { AdministracionService } from 'src/app/Services/administracion.service';
import { LoginService } from 'src/app/Services/auth/login.service';
import { MensajesService } from 'src/app/Services/mensajes.service';

@Component({
  selector: 'app-restaurante-listado',
  templateUrl: './restaurante-listado.component.html',
  styleUrls: ['./restaurante-listado.component.css']
})
export class RestauranteListadoComponent implements OnInit{

  userLoginOn:boolean=false;
  restaurantes!: RestauranteDTO[];
  displayedColumns: string[] = ['nombre', 'email', 'ciudad', 'direccion','acciones'];
  restauranteExito: any = null;
  restauranteError: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private administracionService: AdministracionService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private mensajesService: MensajesService
  ){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn=userLoginOn;
        if(this.userLoginOn){
          this.mensajesService.getSuccessMessage().pipe(filter(mensaje => mensaje !== null))
          .subscribe(mensaje => {
            this.restauranteExito = mensaje;
            setTimeout(() => this.mensajesService.clearSuccessMessage(), 200);
          });
          this.administracionService.getRestaurantes().subscribe({
            next: (restaurantes) => {
              this.restaurantes = restaurantes;
              console.log("restaurantes: ", this.restaurantes)
            },
            error: (error) => {
              console.error('ngOnInit restaurante-listado.component error', error);
              this.restauranteError = error;
            }
          });
        }
      }
    })
  }

  eliminarRestaurante(idRestaurante: number): void{
    if(idRestaurante > -1){
      this.administracionService.getRestaurante(idRestaurante).subscribe({
        next: (restaurante) => {
          let result = confirm(
            "Vas a eliminar el restaurante "+restaurante.nombre.toUpperCase()+", ¿deseas confirmar?"
          );
          if(result){
            this.administracionService.eliminarRestaurante(idRestaurante).subscribe({
              next: (res) => {
                console.log("Se ha eliminado el restaurante correctamente");
                this.restauranteExito = "Se ha eliminado el restaurante correctamente";
                this.restaurantes = this.restaurantes.filter(r => r.id !== idRestaurante);
              },
              error: (error) => {
                console.error("No se ha podido eliminar el restaurante", error)
                this.restauranteError = error;
              }
            })
          }
        },
        error: (error) => {
          console.error("No se ha podido recuperar la empresa", error)
          this.restauranteError = error;
        }
      })
    }
  }

}
