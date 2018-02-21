import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  // using switchMap to switch from one observable (auth.user$)
  // to new observable (from userService.get())
  // so that we can map object within this second obeservable
  // without having to call subscribe() within a map()/subscribe()
  canActivate(): Observable<boolean> {
    return this.auth.user$
      .switchMap(user => this.userService.get(user.uid))
      .map(appUser => appUser.isAdmin);
  }

}
