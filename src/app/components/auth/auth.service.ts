import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';


@Injectable()

export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: '6oI06gi4pieicugAx0QaSfRkuVlpEiOg',
    domain: 'koridor.auth0.com',
    responseType: 'token id_token',
    grant_type: 'implicit',
    audience: 'http://localhost:8080',
    // redirectUri: 'http://localhost:8080/api/v1/authentication/callback',
    redirectUri: 'http://localhost:4200/home',
    scope: 'openid admin'
  });

  constructor(private router: Router) {
  }


  public login(): void {
    this.handleAuthentication();
    this.auth0.authorize();
    // this.handleAuthentication();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['../home']);
        console.log('without error: ', authResult);
      } else if (err) {
        this.router.navigate(['../home']);
        console.log(err);
      }
    });
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
