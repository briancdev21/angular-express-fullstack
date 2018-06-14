import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

// helpers
import { apiHeaders, apiUrl } from '../../config';

// rxjs
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
@Injectable()

export class ProductsService {

  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'POST' };

  constructor( private http: HttpClient) {
  }

  getProductsList (limit: number = 50, offset: number = 0): Observable<any> {
    const url = `${apiUrl}inventory/products/?limit=${limit}&offset=${offset}`;
    // const url = `${apiUrl}inventory/products/`;
    console.log('id_token', apiHeaders());
    return this.http.get(url);
  }

  createProduct (body): Observable<any> {
    // const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'POST' };
    const url = `${apiUrl}inventory/products/`;
    return this.http.post(url, body, this.options)
      .map((res) => res);

    // return this.http.post<any>(url, body);
      // .pipe(tap(data => {
      //   console.log('return post data: ', data);
      // }));

  }

  getIndividualProduct(id): Observable<any>  {
    const url = `${apiUrl}inventory/products/${id}`;
    return this.http.get(url);
  }

  updateIndividualProduct(id, body): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}`;
    return this.http.put<any> (url, body);
  }

  deleteIndividualProduct (id): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}`;
    return this.http.delete<any>(url);
  }

  uploadProductProfileImage (productId, body): Observable<any> {
    const url = `${apiUrl}inventory/products/${productId}/product-picture`;
    return this.http.put(url, body)
      .map((res) => res);
  }

  getVariantsList(productId): Observable<any>  {
    const url = `${apiUrl}inventory/products/${productId}/variants`;
    return this.http.get(url);
  }

}

