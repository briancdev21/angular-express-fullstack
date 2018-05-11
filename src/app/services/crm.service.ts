import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

// helpers
import { apiHeaders, apiUrl } from '../config';

// rxjs
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
@Injectable()

export class CrmService {

  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'POST' };

  constructor( private http: HttpClient) {
  }

  getLeadsList (limit: number = 50, offset: number = 0): Observable<any> {
    const url = `${apiUrl}crm/leads/?limit=${limit}&offset=${offset}`;
    // const url = `${apiUrl}crm/leads/`;
    console.log('id_token', apiHeaders());
    return this.http.get(url);
  }

  createLead (body): Observable<any> {
    // const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'POST' };
    const url = `${apiUrl}crm/leads/`;
    return this.http.post(url, body, this.options)
      .map((res) => res);

    // return this.http.post<any>(url, body);
      // .pipe(tap(data => {
      //   console.log('return post data: ', data);
      // }));

  }

  getIndividualLead(id): Observable<any>  {
    const url = `${apiUrl}crm/leads/${id}`;
    return this.http.get(url);
  }

  getContactsList (): Observable<any> {
    const url = `${apiUrl}crm/contacts/`;
    console.log('id_token', apiHeaders());
    return this.http.get(url);
  }

  createContact (body): Observable<any> {
    const url = `${apiUrl}crm/contacts/`;
    return this.http.post(url, body, this.options)
      .map((res) => res);
  }

  getIndividualContact(id): Observable<any>  {
    const url = `${apiUrl}crm/contacts/${id}`;
    return this.http.get(url);
  }
}

