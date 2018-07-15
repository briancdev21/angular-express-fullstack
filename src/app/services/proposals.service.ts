import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// helpers
import { apiUrl } from '../config';
import { environment } from '../../environments/environment';

// rxjs
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
@Injectable()

export class ProposalsService {

  constructor( private http: HttpClient) {
  }

  // getKeywords (): Observable<any> {
  //   const url = `${environment.apiUrl}/organization/keywords/`;
  //   return this.http.get(url);
  // }

  // createKeyword (body): Observable<any> {
  //   const url = `${environment.apiUrl}/organization/keywords/`;
  //   return this.http.post<any>(url, body);
  // }

  // deleteKeyword (id): Observable<any> {
  //   const url = `${environment.apiUrl}/organization/keywords/${id}`;
  //   return this.http.delete<any>(url);
  // }

  // getIndividualKeyword(id): Observable<any>  {
  //   const url = `${environment.apiUrl}/organization/keywords/${id}`;
  //   return this.http.get(url);
  // }

  getProposals (): Observable<any> {
    const url = `${environment.apiUrl}/sales/proposals/`;
    return this.http.get(url);
  }

  createProposal (body): Observable<any> {
    const url = `${environment.apiUrl}/sales/proposals/`;
    return this.http.post<any>(url, body);
  }

  getIndividualProposal(id): Observable<any>  {
    const url = `${environment.apiUrl}/sales/proposals/${id}`;
    return this.http.get(url);
  }
  updateIndividualProposal(id, proposalData): Observable<any>  {
    const url = `${environment.apiUrl}/sales/proposals/${id}`;
    return this.http.put(url, proposalData);
  }

  getProposalProducts (id): Observable<any> {
    const url = `${environment.apiUrl}/sales/proposals/${id}/products`;
    return this.http.get(url);
  }

  createProposalProduct (id, body): Observable<any> {
    const url = `${environment.apiUrl}/sales/proposals/${id}/products`;
    return this.http.post<any>(url, body);
  }

  getIndividualProposalProduct(id, productId): Observable<any>  {
    const url = `${environment.apiUrl}/sales/proposals/${id}/products/${productId}`;
    return this.http.get(url);
  }
  updateIndividualProposalProduct(id, productId, proposalData): Observable<any>  {
    const url = `${environment.apiUrl}/sales/proposals/${id}/products/${productId}`;
    return this.http.put(url, proposalData);
  }
  deleteIndividualProposalProduct(id, productId): Observable<any>  {
    const url = `${environment.apiUrl}/sales/proposals/${id}/products/${productId}`;
    return this.http.delete(url);
  }
  generateProposalPdf (proposalId): Observable<any>  {
    const url = `${environment.apiUrl}/sales/proposals/${proposalId}/export`;
    return this.http.get(url);
  }
}
