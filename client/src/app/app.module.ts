import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { RegistrationComponent } from './registration/registration.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { AddcargoComponent } from './addcargo/addcargo.component';
import { AssginCargoComponent } from './assgin-cargo/assgin-cargo.component';
import { ViewcargostatusComponent } from './viewcargostatus/viewcargostatus.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GlobalErrorHandler } from '../services/global-error-handler.service';
import { Navbar } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
      RegistrationComponent,
      DashbaordComponent,
      AddcargoComponent,
      AssginCargoComponent,
      ViewcargostatusComponent,
      ErrorPageComponent,
      Navbar,
      HomeComponent,
      ShipmentsComponent,
      FooterComponent
      
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [HttpService,HttpClientModule  ,{provide:ErrorHandler,useClass:GlobalErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
