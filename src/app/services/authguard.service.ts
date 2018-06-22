import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { Router,  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()

export class AuthGuard implements CanActivate {
  today = new Date();

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentTime = this.today.getTime();
    const expireAt = parseInt(localStorage.getItem('expires_at'), 10);
    console.log('auth guard: ', expireAt, currentTime);
    if (expireAt > currentTime) {
        // logged in so return true
        return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
