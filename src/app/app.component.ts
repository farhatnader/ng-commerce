import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /** 
   * During app load, check AuthService observable for user values
   * If user logged in, redirect to url captured in localStorage
   * This is handy for:
   * - deep linking to a route after user is returned from firebase auth
   * -- the protected routes will have been captured, see AuthGuardService
   * - when user goes to login route when already logged in
   * -- default '/' will have been assigned to localStorage, see AuthService
   */
  constructor(private auth: AuthService, router: Router) {
    // no need to unsubscribe since this component will live until app is closed
    auth.user$.subscribe(user => {
      if (user) {
        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    })
  }
}
