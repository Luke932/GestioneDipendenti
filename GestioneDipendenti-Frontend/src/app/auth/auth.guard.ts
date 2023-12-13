import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authSrv: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const roles = next.data['roles'] as Array<string>;

    if (this.authSrv.isLoggedIn() && this.authSrv.hasRoles(roles)) {
      //console.log("è verp!!!!!!");
      
      return true;
    }
    //console.log("è falso!!!!!");
    

    this.router.navigate(['/login']);
    return false;
  }
}
