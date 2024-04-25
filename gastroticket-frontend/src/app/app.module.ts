import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresaFormularioComponent } from './Components/empresas/empresa-formulario/empresa-formulario.component';
import { EmpresaListadoComponent } from './Components/empresas/empresa-listado/empresa-listado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { RestaurantesComponent } from './Components/restaurantes/restaurantes.component';
import { AdministracionComponent } from './Components/administracion/administracion.component';
import { EmpleadoComponent } from './Components/empleado/empleado.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DashEmpresasComponent } from './Components/dashboard/dash-empresas/dash-empresas.component';
import { DashRestaurantesComponent } from './Components/dashboard/dash-restaurantes/dash-restaurantes.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpresaFormularioComponent,
    EmpresaListadoComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    RestaurantesComponent,
    AdministracionComponent,
    EmpleadoComponent,
    NavbarComponent,
    DashEmpresasComponent,
    DashRestaurantesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
