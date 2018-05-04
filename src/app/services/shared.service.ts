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

  deleteKeyword (id): Observable<any> {
    const url = `${apiUrl}keywords/${id}`;
    return this.http.delete<any>(url);
  }

  getIndividualKeyword(id): Observable<any>  {
    const url = `${apiUrl}keywords/${id}`;
    return this.http.get(url);
  }

  // brand
  getBrands(): Observable<any> {
    const url = `${apiUrl}brands/`;
    return this.http.get(url);
  }

  createBrand (body): Observable<any> {
    const url = `${apiUrl}brands/`;
    return this.http.post<any>(url, body);
  }

  getIndividualBrand(id): Observable<any>  {
    const url = `${apiUrl}brands/${id}`;
    return this.http.get(url);
  }

  deleteBrand (id): Observable<any> {
    const url = `${apiUrl}brands/${id}`;
    return this.http.delete<any>(url);
  }

  // Location
  getLocations(): Observable<any> {
    const url = `${apiUrl}locations/`;
    return this.http.get(url);
  }

  createLocation (body): Observable<any> {
    const url = `${apiUrl}locations/`;
    return this.http.post<any>(url, body);
  }

  getIndividualLocation(id): Observable<any>  {
    const url = `${apiUrl}locations/${id}`;
    return this.http.get(url);
  }

  deleteLocation (id): Observable<any> {
    const url = `${apiUrl}locations/${id}`;
    return this.http.delete<any>(url);
  }

  updateIndividualLocation(id, body) {
    const url = `${apiUrl}locations/${id}`;
    return this.http.post<any>(url, body);
  }

  // Product Type
  getProductTypes(): Observable<any> {
    const url = `${apiUrl}productTypes/`;
    return this.http.get(url);
  }

  createProductType (body): Observable<any> {
    const url = `${apiUrl}productTypes/`;
    return this.http.post<any>(url, body);
  }

  getIndividualProductType(id): Observable<any>  {
    const url = `${apiUrl}productTypes/${id}`;
    return this.http.get(url);
  }

  deleteProductType (id): Observable<any> {
    const url = `${apiUrl}productTypes/${id}`;
    return this.http.delete<any>(url);
  }

  // Currency
  getCurrencies(): Observable<any> {
    const url = `${apiUrl}currencies/`;
    return this.http.get(url);
  }

  createCurrency (body): Observable<any> {
    const url = `${apiUrl}currencies/`;
    return this.http.post<any>(url, body);
  }

  getIndividualCurrency(id): Observable<any>  {
    const url = `${apiUrl}currencies/${id}`;
    return this.http.get(url);
  }

  deleteCurrency (id): Observable<any> {
    const url = `${apiUrl}currencies/${id}`;
    return this.http.delete<any>(url);
  }


  // User
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

  getIndividualUser(id): Observable<any>  {
    const url = `${apiUrl}users/${id}`;
    return this.http.get(url);
  }

  updateIndividualUser(id, body): Observable<any>  {
    const url = `${apiUrl}users/${id}`;
    return this.http.put(url, body);
  }

  // Contact
  getContacts() {
    const url = `${apiUrl}crm/contacts/`;
    return this.http.get(url).map(data => data['results']);
  }

  createContact (body): Observable<any> {
    const url = `${apiUrl}users/`;
    return this.http.post<any>(url, body);
  }

  updateContact (body): Observable<any> {
    const url = `${apiUrl}users/`;
    return this.http.put<any>(url, body);
  }

}
