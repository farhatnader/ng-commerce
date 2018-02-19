import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  /**
   * CanActivate Module expects property called canActivate
   * RouterStateSnapshot to capture route url
   * This only happens for protected routes
   */
  canActivate(route, state: RouterStateSnapshot) {
    // needs to be returned, so using map instead of subscribe
    return this.auth.user$.map(user => {
      if (user) return true;

      // Router.navigate() allows passing in query params
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    })
  }
}
