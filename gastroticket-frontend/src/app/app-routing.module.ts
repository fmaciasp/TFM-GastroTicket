import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaFormularioComponent } from './Components/administracion/empresas/empresa-formulario/empresa-formulario.component';
import { LoginComponent } from './Components/login/login.component';
import { DashRestaurantesComponent } from './Components/dashboard/dash-restaurantes/dash-restaurantes.component';
import { DashEmpresasComponent } from './Components/dashboard/dash-empresas/dash-empresas.component';
import { AdministracionComponent } from './Components/administracion/administracion.component';
import { EmpresaListadoComponent } from './Components/administracion/empresas/empresa-listado/empresa-listado.component';
import { EmpleadoComponent } from './Components/empleado/empleado.component';
import { RestauranteListadoComponent } from './Components/administracion/restaurantes/restaurante-listado/restaurante-listado.component';
import { RestauranteFormularioComponent } from './Components/administracion/restaurantes/restaurante-formulario/restaurante-formulario.component';
import { RegistroComponent } from './registro/registro.component';
import { EmpleadoFormComponent } from './Components/dashboard/dash-empresas/empleado-form/empleado-form.component';
import { ActivarCuentaComponent } from './Components/activar-cuenta/activar-cuenta.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio', pathMatch: 'full'
  },
  {
    path: 'dashboard/restaurantes',
    redirectTo: 'inicio', pathMatch: 'full'
  },
  {
    path: 'dashboard',
    redirectTo: 'inicio', pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: DashRestaurantesComponent
  },
  {
    path: 'administracion',
    component: AdministracionComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'activate',
    component: ActivarCuentaComponent
  },
  {
    path: 'empresas',
    component: EmpresaListadoComponent
  },
  {
    path: 'empresa/nueva',
    component: EmpresaFormularioComponent
  },
  {
    path: 'empresa/editar/:idEmpresa',
    component: EmpresaFormularioComponent
  },
  {
    path: 'restaurantes',
    component: RestauranteListadoComponent
  },
  {
    path: 'restaurante/nuevo',
    component: RestauranteFormularioComponent
  },
  {
    path: 'restaurante/editar/:idRestaurante',
    component: RestauranteFormularioComponent
  },
  {
    path: 'dash-empresa',
    component: DashEmpresasComponent
  },
  {
    path: 'dash-restaurante',
    component: DashRestaurantesComponent
  },
  {
    path: 'empleado/nuevo',
    component: EmpleadoFormComponent
  },
  {
    path: 'empleado/editar/:idEmpleado',
    component: EmpleadoFormComponent
  },
  {
    path: 'mis-cupones',
    component: EmpleadoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
