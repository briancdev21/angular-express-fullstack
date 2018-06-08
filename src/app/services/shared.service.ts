import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// helpers
import { environment } from '../../environments/environment';

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
    const url = `${environment.apiUrl}/keywords/`;
    return this.http.get(url);
  }

  createKeyword (body): Observable<any> {
    const url = `${environment.apiUrl}/keywords/`;
    return this.http.post<any>(url, body);
  }

  deleteKeyword (id): Observable<any> {
    const url = `${environment.apiUrl}/keywords/${id}`;
    return this.http.delete<any>(url);
  }

  getIndividualKeyword(id): Observable<any>  {
    const url = `${environment.apiUrl}/keywords/${id}`;
    return this.http.get(url);
  }

  // brand
  getBrands(): Observable<any> {
    const url = `${environment.apiUrl}/brands/`;
    return this.http.get(url);
  }

  createBrand (body): Observable<any> {
    const url = `${environment.apiUrl}/brands/`;
    return this.http.post<any>(url, body);
  }

  getIndividualBrand(id): Observable<any>  {
    const url = `${environment.apiUrl}/brands/${id}`;
    return this.http.get(url);
  }

  deleteBrand (id): Observable<any> {
    const url = `${environment.apiUrl}/brands/${id}`;
    return this.http.delete<any>(url);
  }

  // Location
  getLocations(): Observable<any> {
    const url = `${environment.apiUrl}/locations/`;
    return this.http.get(url);
  }

  createLocation (body): Observable<any> {
    const url = `${environment.apiUrl}/locations/`;
    return this.http.post<any>(url, body);
  }

  getIndividualLocation(id): Observable<any>  {
    const url = `${environment.apiUrl}/locations/${id}`;
    return this.http.get(url);
  }

  deleteLocation (id): Observable<any> {
    const url = `${environment.apiUrl}/locations/${id}`;
    return this.http.delete<any>(url);
  }

  updateIndividualLocation(id, body) {
    const url = `${environment.apiUrl}/locations/${id}`;
    return this.http.post<any>(url, body);
  }

  // Product Type
  getProductTypes(): Observable<any> {
    const url = `${environment.apiUrl}/productTypes/`;
    return this.http.get(url);
  }

  createProductType (body): Observable<any> {
    const url = `${environment.apiUrl}/productTypes/`;
    return this.http.post<any>(url, body);
  }

  getIndividualProductType(id): Observable<any>  {
    const url = `${environment.apiUrl}/productTypes/${id}`;
    return this.http.get(url);
  }

  deleteProductType (id): Observable<any> {
    const url = `${environment.apiUrl}/productTypes/${id}`;
    return this.http.delete<any>(url);
  }

  // Currency
  getCurrencies(): Observable<any> {
    const url = `${environment.apiUrl}/currencies/`;
    return this.http.get(url);
  }

  createCurrency (body): Observable<any> {
    const url = `${environment.apiUrl}/currencies/`;
    return this.http.post<any>(url, body);
  }

  getIndividualCurrency(id): Observable<any>  {
    const url = `${environment.apiUrl}/currencies/${id}`;
    return this.http.get(url);
  }

  deleteCurrency (id): Observable<any> {
    const url = `${environment.apiUrl}/currencies/${id}`;
    return this.http.delete<any>(url);
  }


  // User
  getUsers (): Observable<any> {
    const url = `${environment.apiUrl}/users/`;
    return this.http.get(url).map(data => data['results']);
  }

  createUser (body): Observable<any> {
    const url = `${environment.apiUrl}/users/`;
    return this.http.post<any>(url, body);
  }

  deleteUser (body): Observable<any> {
    const url = `${environment.apiUrl}/users/`;
    return this.http.delete<any>(url, body);
  }

  updateUser (body): Observable<any> {
    const url = `${environment.apiUrl}/users/`;
    return this.http.put<any>(url, body);
  }

  getIndividualUser(id): Observable<any>  {
    const url = `${environment.apiUrl}/users/${id}`;
    return this.http.get(url);
  }

  updateIndividualUser(id, body): Observable<any>  {
    const url = `${environment.apiUrl}/users/${id}`;
    return this.http.put(url, body);
  }

  // Contact
  getContacts() {
    const url = `${environment.apiUrl}/crm/contacts/`;
    return this.http.get(url).map(data => data['results']);
  }

  createContact (body): Observable<any> {
    const url = `${environment.apiUrl}/users/`;
    return this.http.post<any>(url, body);
  }

  updateContact (body): Observable<any> {
    const url = `${environment.apiUrl}/users/`;
    return this.http.put<any>(url, body);
  }

  // Terms
  getTerms(): Observable<any> {
    const url = `${apiUrl}organization/terms`;
    return this.http.get(url);
  }

  createTerm (body): Observable<any> {
    const url = `${apiUrl}organization/terms`;
    return this.http.post<any>(url, body);
  }

  getIndividualTerm(id): Observable<any>  {
    const url = `${apiUrl}organization/terms/${id}`;
    return this.http.get(url);
  }

  deleteTerm (id): Observable<any> {
    const url = `${apiUrl}organization/terms/${id}`;
    return this.http.delete<any>(url);
  }

  // Pricing Category
  getPricingCategories(): Observable<any> {
    const url = `${apiUrl}organization/pricing-categories`;
    return this.http.get(url);
  }

  createPricingCategory (body): Observable<any> {
    const url = `${apiUrl}organization/pricing-categories`;
    return this.http.post<any>(url, body);
  }

  getIndividualPricingCategory(id): Observable<any>  {
    const url = `${apiUrl}organization/pricing-categories/${id}`;
    return this.http.get(url);
  }

  updateIndividualPricingCategory(id, body): Observable<any>  {
    const url = `${apiUrl}organization/pricing-categories/${id}`;
    return this.http.put(url, body);
  }

  // Tax-rate
  getTaxRates(): Observable<any> {
    const url = `${apiUrl}organization/tax-rates`;
    return this.http.get(url);
  }

  createTaxRate (body): Observable<any> {
    const url = `${apiUrl}organization/tax-rates`;
    return this.http.post<any>(url, body);
  }

  getIndividualTaxRate(id): Observable<any>  {
    const url = `${apiUrl}organization/tax-rates/${id}`;
    return this.http.get(url);
  }

  deleteTaxRate (id): Observable<any> {
    const url = `${apiUrl}organization/tax-rates/${id}`;
    return this.http.delete<any>(url);
  }

  // Classification
  getClassifications(): Observable<any> {
    const url = `${apiUrl}organization/classifications`;
    return this.http.get(url);
  }

  createClassification (body): Observable<any> {
    const url = `${apiUrl}organization/classifications`;
    return this.http.post<any>(url, body);
  }

  getIndividualClassification(id): Observable<any>  {
    const url = `${apiUrl}organization/classifications/${id}`;
    return this.http.get(url);
  }

  deleteClassification (id): Observable<any> {
    const url = `${apiUrl}organization/classifications/${id}`;
    return this.http.delete<any>(url);
  }


  // Sources
  getSources(): Observable<any> {
    const url = `${apiUrl}organization/sources`;
    return this.http.get(url);
  }

  createSource (body): Observable<any> {
    const url = `${apiUrl}organization/sources`;
    return this.http.post<any>(url, body);
  }

  getIndividualSource(id): Observable<any>  {
    const url = `${apiUrl}organization/sources/${id}`;
    return this.http.get(url);
  }

  deleteSource (id): Observable<any> {
    const url = `${apiUrl}organization/sources/${id}`;
    return this.http.delete<any>(url);
  }

}
