import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute) {
      this.user$=afAuth.authState;
   }
   login(){
    let redirectUrl=this.route.snapshot.queryParamMap.get('redirectUrl') || '/';
    localStorage.setItem('redirectUrl',redirectUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

   logout(){
    this.afAuth.auth.signOut();
   }


   //We want to get the observable appUser in order to be able to use it in the bs-navbar (to hide/show links based on is/or not admin)
   get appUser$(): Observable<AppUser>{
    return this.user$
    .switchMap(user => {
      if (user) return this.userService.get(user.uid).valueChanges();
      return Observable.of(null);
     });
}
}
