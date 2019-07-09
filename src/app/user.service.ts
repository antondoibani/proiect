import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';



@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) {}

  //Save method to save the user in the database
  save(user: firebase.User){
    this.db.object('/users/'+user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  //Get method, to get the user object (firebase object observable of type AppUser (see models/app-user interface))
  get(uid: string): AngularFireObject<AppUser>{
      return this.db.object('/users/' + uid);
  }
  }

