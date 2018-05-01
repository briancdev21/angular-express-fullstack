import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// helpers
import { apiUrl } from '../config';

// rxjs
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
@Injectable()

export class SharedService {

  constructor( private http: HttpClient) {
  }

  getKeywords (): Observable<any> {
    const url = `${apiUrl}keywords/`;
    return this.http.get(url);
  }

  createKeyword (body): Observable<any> {
    const url = `${apiUrl}keywords/`;
    return this.http.post<any>(url, body);
  }

  deleteKeyword (body): Observable<any> {
    const url = `${apiUrl}keywords/`;
    return this.http.delete<any>(url, body);
  }

  getUsers (): Observable<any> {
    const url = `${apiUrl}users/`;
    return this.http.get(url).map(data => data['results']);
  }

  createUser (body): Observable<any> {
    const url = `${apiUrl}users/`;
    return this.http.post<any>(url, body);
  }

  deleteUser (body): Observable<any> {
    const url = `${apiUrl}users/`;
    return this.http.delete<any>(url, body);
  }

  updateUser (body): Observable<any> {
    const url = `${apiUrl}users/`;
    return this.http.put<any>(url, body);
  }

}
