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

export class ProductsService {

  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'POST' };

  constructor( private http: HttpClient) {
  }

  getProductsList (): Observable<any> {
    const url = `${apiUrl}inventory/products/`;
    return this.http.get(url);
  }

  createProduct (body): Observable<any> {
    // const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'POST' };
    const url = `${apiUrl}inventory/products/`;
    return this.http.post(url, body, this.options)
      .map((res) => res);
  }

  getIndividualProduct(id): Observable<any>  {
    const url = `${apiUrl}inventory/products/${id}`;
    return this.http.get(url);
  }

  updateIndividualProduct(id, body): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}`;
    return this.http.put(url, body);
  }

  deleteIndividualProduct(id): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}`;
    return this.http.delete(url);
  }

  getProductCategoriesList(id): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}/pricing-categories`;
    return this.http.get(url);
  }

  getProductIndividualCategory(id, categoryId): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}/pricing-categories/${categoryId}`;
    return this.http.get(url);
  }

  updateProductIndividualCategory(id, categoryId, body): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}/pricing-categories/${categoryId}`;
    return this.http.put(url, body);
  }

  getProductVariantsList(id): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}/variants`;
    return this.http.get(url);
  }

  getProductIndividualVariant(id, sku): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}/pricing-categories/${sku}`;
    return this.http.get(url);
  }

  updateProductIndividualVariant(id, sku, body): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}/pricing-categories/${sku}`;
    return this.http.put(url, body);
  }

  deleteProductIndividualVariant(id, sku): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}/pricing-categories/${sku}`;
    return this.http.delete(url);
  }

  updateProductImage(id, body): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}/product-picture/`;
    return this.http.put(url, body);
  }
}
