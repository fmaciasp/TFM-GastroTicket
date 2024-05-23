import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaFormularioComponent } from './Components/administracion/empresas/empresa-formulario/empresa-formulario.component';
import { LoginComponent } from './Components/login/login.component';
import { DashRestaurantesComponent } from './Components/dashboard/dash-restaurantes/dash-restaurantes.component';
import { DashEmpresasComponent } from './Components/dashboard/dash-empresas/dash-empresas.component';
import { AdministracionComponent } from './Components/administracion/administracion.component';
import { EmpresaListadoComponent } from './Components/administracion/empresas/empresa-listado/empresa-listado.component';
import { RestauranteListadoComponent } from './Components/administracion/restaurantes/restaurante-listado/restaurante-listado.component';
import { RestauranteFormularioComponent } from './Components/administracion/restaurantes/restaurante-formulario/restaurante-formulario.component';
import { RegistroComponent } from './registro/registro.component';
import { EmpleadoFormComponent } from './Components/dashboard/dash-empresas/empleado-form/empleado-form.component';
import { ActivarCuentaComponent } from './Components/activar-cuenta/activar-cuenta.component';
import { RestauranteGuard } from './guards/restaurante.guard';
import { AdminGuard } from './guards/admin.guard';
import { EmpresaGuard } from './guards/empresa.guard';
import { InicioComponent } from './Components/inicio/inicio.component';
import { DashEmpleadoComponent } from './Components/dashboard/dash-empleado/dash-empleado.component';
import { EmpleadoGuard } from './guards/empleado.guard';
import { PermisoDenegadoComponent } from './Components/permiso-denegado/permiso-denegado.component';

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
    component: InicioComponent
  },
  {
    path: 'administracion',
    component: AdministracionComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'administracion',
    component: AdministracionComponent,
    canActivate: [AdminGuard],
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
    component: EmpresaListadoComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'empresa/nueva',
    component: EmpresaFormularioComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'empresa/editar/:idEmpresa',
    component: EmpresaFormularioComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'restaurantes',
    component: RestauranteListadoComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'restaurante/nuevo',
    component: RestauranteFormularioComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'restaurante/editar/:idRestaurante',
    component: RestauranteFormularioComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'dash-empresa',
    component: DashEmpresasComponent,
    canActivate: [EmpresaGuard],
  },
  {
    path: 'dash-restaurante',
    component: DashRestaurantesComponent,
    canActivate: [RestauranteGuard],
  },
  {
    path: 'empleado/nuevo',
    component: EmpleadoFormComponent,
    canActivate: [EmpresaGuard],
  },
  {
    path: 'empleado/editar/:idEmpleado',
    component: EmpleadoFormComponent,
    canActivate: [EmpresaGuard],
  },
  {
    path: 'dash-empleado',
    component: DashEmpleadoComponent,
    canActivate: [EmpleadoGuard],
  },
  {
    path: 'permiso-denegado',
    component: PermisoDenegadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
