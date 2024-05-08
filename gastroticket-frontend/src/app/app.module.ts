import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresaFormularioComponent } from './Components/administracion/empresas/empresa-formulario/empresa-formulario.component';
import { EmpresaListadoComponent } from './Components/administracion/empresas/empresa-listado/empresa-listado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { AdministracionComponent } from './Components/administracion/administracion.component';
import { EmpleadoComponent } from './Components/empleado/empleado.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DashEmpresasComponent } from './Components/dashboard/dash-empresas/dash-empresas.component';
import { DashRestaurantesComponent } from './Components/dashboard/dash-restaurantes/dash-restaurantes.component';
import { PersonalDetailsComponent } from './Components/personal-details/personal-details.component';
import { JwtInterceptorService } from './Services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './Services/auth/error-interceptor.service';
import { RestauranteListadoComponent } from './Components/administracion/restaurantes/restaurante-listado/restaurante-listado.component';
import { RestauranteFormularioComponent } from './Components/administracion/restaurantes/restaurante-formulario/restaurante-formulario.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    EmpresaFormularioComponent,
    EmpresaListadoComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    AdministracionComponent,
    EmpleadoComponent,
    NavbarComponent,
    DashEmpresasComponent,
    DashRestaurantesComponent,
    PersonalDetailsComponent,
    RestauranteListadoComponent,
    RestauranteFormularioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptorService, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptorService, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
