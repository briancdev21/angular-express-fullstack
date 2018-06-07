declare function require(path: string);
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

  deleteIndividualLead(id): Observable<any>  {
    const url = `${apiUrl}crm/leads/${id}`;
    return this.http.delete(url);
  }

  updateIndividualLead(id, body): Observable<any> {
    const url = `${apiUrl}crm/leads/${id}`;
    return this.http.put<any> (url, body);
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

  updateIndividualContact(id, body): Observable<any> {
    const url = `${apiUrl}crm/contacts/${id}`;
    return this.http.put<any> (url, body);
  }

  getLeadActivities(id): Observable<any> {
    const url = `${apiUrl}crm/leads/${id}/recent-activities`;
    return this.http.get(url);
  }

  createLeadActivity (id, body): Observable<any> {
    const url = `${apiUrl}crm/leads/${id}/recent-activities`;
    return this.http.post(url, body, this.options)
      .map((res) => res);
  }

  uploadLeadProfileImage (leadId, body): Observable<any> {
    const url = `${apiUrl}crm/leads/${leadId}/lead-picture`;
    // const option = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }) };
    return this.http.put(url, body)
      .map((res) => res);
  }

  getContactActivities(id): Observable<any> {
    const url = `${apiUrl}crm/contacts/${id}/recent-activities`;
    return this.http.get(url);
  }

  deleteIndividualContact(id): Observable<any>  {
    const url = `${apiUrl}crm/contacts/${id}`;
    return this.http.delete(url);
  }

  createContactActivity (id, body): Observable<any> {
    const url = `${apiUrl}crm/contacts/${id}/recent-activities`;
    return this.http.post(url, body, this.options)
      .map((res) => res);
  }

  uploadContactProfileImage (leadId, body): Observable<any> {
    const url = `${apiUrl}crm/contacts/${leadId}/contact-picture`;
    // const option = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }) };
    return this.http.put(url, body)
      .map((res) => res);
  }
}

