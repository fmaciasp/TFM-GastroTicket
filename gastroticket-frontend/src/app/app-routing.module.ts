import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaListadoComponent } from './Components/empresas/empresa-listado/empresa-listado.component';
import { EmpresaFormularioComponent } from './Components/empresas/empresa-formulario/empresa-formulario.component';

const routes: Routes = [
  {
    path: '',
    component: EmpresaListadoComponent
  },
  {
    path: 'empresa/nueva',
    component: EmpresaFormularioComponent
  },
  {
    path: 'empresa/editar/:idEmpresa',
    component: EmpresaFormularioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
