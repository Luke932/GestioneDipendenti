import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UtentiComponent } from './components/utenti/utenti.component';
import { AggiungiUtenteComponent } from './components/aggiungi-utente/aggiungi-utente.component';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './components/user/user.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { ListaOrariComponent } from './components/lista-orari/lista-orari.component';
import { HomeutenteComponent } from './components/homeutente/homeutente.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent, children: [
      {path: '', redirectTo: 'utenti', pathMatch: 'full'},
      {path: 'utenti', component: UtentiComponent},
      {path: 'aggiungi', component: AggiungiUtenteComponent},
      {path: 'lista', component: ListaOrariComponent}
    ],
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'user',
    component: UserComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeutenteComponent}
    ],
    canActivate: [AuthGuard],
    data: { roles: ['USER'] }
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
