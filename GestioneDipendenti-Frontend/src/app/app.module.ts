import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UtentiComponent } from './components/utenti/utenti.component';
import { AggiungiUtenteComponent } from './components/aggiungi-utente/aggiungi-utente.component';
import { ListaOrariComponent } from './components/lista-orari/lista-orari.component';
import { UserComponent } from './components/user/user.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { HomeutenteComponent } from './components/homeutente/homeutente.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UtentiComponent,
    AggiungiUtenteComponent,
    ListaOrariComponent,
    UserComponent,
    PageNotFoundComponentComponent,
    HomeutenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
