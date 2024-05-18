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
import { DashEmpresasComponent } from './Components/dashboard/dash-empresas/dash-empresas.component';
import { DashRestaurantesComponent } from './Components/dashboard/dash-restaurantes/dash-restaurantes.component';
import { PersonalDetailsComponent } from './Components/personal-details/personal-details.component';
import { JwtInterceptorService } from './Services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './Services/auth/error-interceptor.service';
import { RestauranteListadoComponent } from './Components/administracion/restaurantes/restaurante-listado/restaurante-listado.component';
import { RestauranteFormularioComponent } from './Components/administracion/restaurantes/restaurante-formulario/restaurante-formulario.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { RegistroComponent } from './registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import { EmpleadoFormComponent } from './Components/dashboard/dash-empresas/empleado-form/empleado-form.component';
import { ActivarCuentaComponent } from './Components/activar-cuenta/activar-cuenta.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import {MatCardModule} from '@angular/material/card';
import { CardComponent } from './Components/card/card.component';
import { FiltroPorCiudadPipe } from './pipes/filtro-por-ciudad.pipe';
import { DialogComponent } from './Components/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { QRCodeModule } from 'angularx-qrcode';
import { DashEmpleadoComponent } from './Components/dashboard/dash-empleado/dash-empleado.component';
import { DialogCuponComponent } from './Components/dialog-cupon/dialog-cupon.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpresaFormularioComponent,
    EmpresaListadoComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    AdministracionComponent,
    DashEmpresasComponent,
    DashRestaurantesComponent,
    PersonalDetailsComponent,
    RestauranteListadoComponent,
    RestauranteFormularioComponent,
    RegistroComponent,
    EmpleadoFormComponent,
    ActivarCuentaComponent,
    InicioComponent,
    CardComponent,
    FiltroPorCiudadPipe,
    DialogComponent,
    DashEmpleadoComponent,
    DialogCuponComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatTooltipModule,
    QRCodeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptorService, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptorService, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
