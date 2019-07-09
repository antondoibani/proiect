import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/Map';



@Injectable({
  providedIn: 'root'
})
export class AdminAuthProtectorService implements CanActivate {

 constructor(private auth: AuthService, private userService: UserService) { }

 canActivate(): Observable<boolean> {
   return this.auth.user$
   .switchMap(user => this.userService.get(user.uid).valueChanges())
   .map(appUser => appUser.isAdmin);

 }


}
