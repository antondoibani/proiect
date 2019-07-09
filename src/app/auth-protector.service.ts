import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot){
    return this.auth.user$.map(user => {if (user) return true;
    this.router.navigate(['/login'], { queryParams: {redirectUrl: state.url}});
    return false;
    });
  }
}
