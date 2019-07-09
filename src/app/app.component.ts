import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CleverTravel';

  constructor(private userService: UserService, private auth: AuthService, router: Router){
      auth.user$.subscribe(user => {
        //if user is not logged in we return
        if(!user) return;
        //else we call userService save(user)
        userService.save(user);

        //read the return url and if it has a value remove it from the local storage and navigate the user
        let redirectUrl=localStorage.getItem('redirectUrl');
        if(!redirectUrl) return;
        localStorage.removeItem('redirectUrl');
        router.navigateByUrl(redirectUrl);
        
      });
    }
  }

