import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

// helpers
import { apiHeaders } from '../config';
import { environment } from '../../environments/environment';

// rxjs
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
@Injectable()

export class SuppliersService {

  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'POST' };

  constructor( private http: HttpClient) {
  }

  getSuppliersList (): Observable<any> {
    const url = `${environment.apiUrl}/inventory/suppliers/`;
    return this.http.get(url);
  }

  createSupplier (body): Observable<any> {
    // const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'POST' };
    const url = `${environment.apiUrl}/inventory/suppliers/`;
    return this.http.post(url, body, this.options)
      .map((res) => res);
  }

  getIndividualSupplier(id): Observable<any>  {
    const url = `${environment.apiUrl}/inventory/suppliers/${id}`;
    return this.http.get(url);
  }

  updateIndividualSupplier(id, body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/suppliers/${id}`;
    return this.http.put(url, body);
  }

  getSupplierActivity(id): Observable<any>  {
    const url = `${environment.apiUrl}/inventory/suppliers/${id}/recent-activity`;
    return this.http.get(url);
  }
}
