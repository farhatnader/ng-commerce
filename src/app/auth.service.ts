import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'; // for functionality not in AngularFireAuth
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  // ActivatedRoute provides access to query params passed in via Route.navigate()
  constructor(
      private userService: UserService, 
      private afAuth: AngularFireAuth, 
      private route: ActivatedRoute) {

    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // store current url before redirecting to firebase auth 
    // to be used after returning to app
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  // provides access to appUser observable (which includes isAdmin prop),
  // instead of just firebase observable (with user$)
  get appUser$() : Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) return this.userService.get(user.uid);
        // return null when user is not logged in
        return Observable.of(null);
      });
  }

}
