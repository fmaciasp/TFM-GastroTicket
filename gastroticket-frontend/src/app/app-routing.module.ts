import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaFormularioComponent } from './Components/empresas/empresa-formulario/empresa-formulario.component';
import { LoginComponent } from './Components/login/login.component';
import { DashRestaurantesComponent } from './Components/dashboard/dash-restaurantes/dash-restaurantes.component';
import { DashEmpresasComponent } from './Components/dashboard/dash-empresas/dash-empresas.component';
import { RestaurantesComponent } from './Components/restaurantes/restaurantes.component';

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
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard/empresas',
    component: DashEmpresasComponent
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
    component: RestaurantesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
