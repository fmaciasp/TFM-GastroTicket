import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../Services/auth/login.service";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class RestauranteGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) {}
  
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> {
          return this.loginService.currentUserRole.pipe(
              map((userLoginRole) => {
                  if (userLoginRole !== 'RESTAURANTE') {
                      this.router.navigate(['/login']);
                      return false;    
                  }
                  return true;
              })
          );
      }
  }