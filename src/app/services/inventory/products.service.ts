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

  createVariants (productId, body): Observable<any> {
    const url = `${apiUrl}inventory/products/${productId}/variants`;
    return this.http.post(url, body, this.options);
  }

  getProductPricingsList(productId): Observable<any>  {
    const url = `${apiUrl}inventory/products/${productId}/pricing-categories`;
    return this.http.get(url);
  }

  getProductAlternativesList(productId): Observable<any>  {
    const url = `${apiUrl}inventory/products/${productId}/alternatives`;
    return this.http.get(url);
  }

  getProductAccessoriesList(productId): Observable<any>  {
    const url = `${apiUrl}inventory/products/${productId}/accessories`;
    return this.http.get(url);
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
    const url = `${apiUrl}inventory/products/${id}/variants/${sku}`;
    return this.http.get(url);
  }

  updateProductIndividualVariant(id, sku, body): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}/variants/${sku}`;
    return this.http.put(url, body);
  }

  deleteProductIndividualVariant(id, sku): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}/variants/${sku}`;
    return this.http.delete(url);
  }

  updateProductImage(id, body): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}/product-picture/`;
    return this.http.put(url, body);
  }

  getProductCatalog(): Observable<any>  {
    const url = `${apiUrl}inventory/catalog`;
    return this.http.get(url);
  }

  getDeliverableProducts(): Observable<any>  {
    const url = `${apiUrl}inventory/deliverable-products`;
    return this.http.get(url);
  }

  getDeliverableProductsByContactId(contactId: any): Observable<any> {
    const url = `${apiUrl}inventory/deliverable-products?contactId=${contactId}`;
    return this.http.get(url);
  }

  getDeliverableProductsByProjectId(projectId: any): Observable<any> {
    const url = `${apiUrl}inventory/deliverable-products?contactId=${projectId}`;
    return this.http.get(url);
  }

  createAlternative (id, body): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}/alternatives`;
    return this.http.post(url, body, this.options);
  }

  createAccessory (id, body): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}/accessories`;
    return this.http.post(url, body, this.options);
  }

  deleteIndividualAccessory (id, sku): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}/accessories/${sku}`;
    return this.http.delete(url,  this.options);
  }

  deleteIndividualAlternative (id, sku): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}/alternatives/${sku}`;
    return this.http.delete(url,  this.options);
  }

  generateSku(): Observable<any>  {
    const url = `${apiUrl}inventory/generate-sku`;
    return this.http.get(url);
  }
}

