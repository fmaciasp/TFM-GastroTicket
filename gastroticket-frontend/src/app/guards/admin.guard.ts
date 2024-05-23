import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../Services/auth/login.service";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) {}
  
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> {
          return this.loginService.currentUserRole.pipe(
              map((userLoginRole) => {
                if(userLoginRole == ''){
                    this.router.navigateByUrl('/login');
                }
                if (userLoginRole !== 'ADMIN') {
                    this.router.navigateByUrl("/permiso-denegado")
                    return false;    
                }
                return true;
              })
          );
      }
  }