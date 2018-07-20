import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';


@Injectable()

export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: environment.authClientId,
    domain: environment.authDomain,
    // responseType: 'token id_token',
    // audience: 'http://localhost:8080',
    // redirectUri: 'http://localhost:4200/home',
    // scope: 'openid'
  });
  returnUrl: string;
  loginFailed: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '../home';
    console.log('returnUrl: ', this.returnUrl);
  }


  public login(userName, password): void {
    const _this = this;
    this.auth0.client.login({
      realm: 'Username-Password-Authentication',
      username: userName,
      password: password,
      scope: 'openid',
      responseType: 'code'
    }, function(err, authResult) {
      if (err) {
        console.log('auth error: ', err, 'res', authResult);
        _this.loginFailed.next(true);
        return;
      } else {
        _this.handleAuthentication(authResult);
        _this.loginFailed.next(false);
      }
    });
  }

  handleAuthentication(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      window.location.hash = '';
      this.setSession(authResult);
      this.router.navigate([this.returnUrl]);
      console.log('without error: ', authResult);
    } else {
      this.router.navigate(['../login']);
      console.log('login err: ');
    }
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
