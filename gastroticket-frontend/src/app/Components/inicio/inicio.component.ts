import { Component, OnInit } from '@angular/core';
import { CardDTO } from 'src/app/Models/card';
import { RestauranteDTO } from 'src/app/Models/restaurante';
import { AdministracionService } from 'src/app/Services/administracion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  ciudad: string = '';
  ciudadesDisponibles: string[] = [];
  restaurantes: CardDTO[] = [];

  constructor(private administracionService: AdministracionService){
  }

  ngOnInit(): void {
    this.cargarRestaurantes();
  }

  cargarRestaurantes(): void{
    this.administracionService.getRestaurantesActivos().subscribe({
      next: (restaurantes) => {
        this.restaurantes = restaurantes;
        this.ciudadesDisponibles = this.obtenerCiudadesUnicas(restaurantes);
      },
      error: (error) => {
        console.error('ngOnInit restaurante-listado.component error', error);
      }
    });
  }

  obtenerCiudadesUnicas(restaurantes: CardDTO[]): string[] {
    const ciudades = new Set<string>();
    restaurantes.forEach((restaurante) => ciudades.add(restaurante.ciudad));
    return Array.from(ciudades).sort();
  }

  filtrarPorCiudad(restaurante: CardDTO): boolean {
    return !this.ciudad || restaurante.ciudad === this.ciudad;
  }

}
