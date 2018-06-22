import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

// helpers
import { apiHeaders, apiUrl } from '../config';

// rxjs
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
@Injectable()

export class ProjectsService {

  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'POST' };

  constructor( private http: HttpClient) {
  }

  getProjectsList (): Observable<any> {
    const url = `${environment.apiUrl}/project-management/projects`;
    return this.http.get(url);
  }

  getIndividualProject(id): Observable<any>  {
    const url = `${environment.apiUrl}/project-management/projects/${id}`;
    return this.http.get(url);
  }

  getProjectCostSummary (id): Observable<any> {
    const url = `${environment.apiUrl}/project-management/projects/${id}/cost-summaries`;
    return this.http.get(url);
  }

  createProjectCostSummary (id, body): Observable<any> {
    const url = `${environment.apiUrl}/project-management/projects/${id}/cost-summaries`;
    return this.http.post(url, body, this.options)
      .map((res) => res);
  }

  deleteIndividualProjectCostSummary(id, summaryId): Observable<any>  {
    const url = `${environment.apiUrl}/project-management/projects/${id}/cost-summaries/${summaryId}`;
    return this.http.delete(url);
  }

  // createSupplier (body): Observable<any> {
  //   // const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'POST' };
  //   const url = `${apiUrl}inventory/suppliers/`;
  //   return this.http.post(url, body, this.options)
  //     .map((res) => res);
  // }

  // getIndividualSupplier(id): Observable<any>  {
  //   const url = `${apiUrl}inventory/suppliers/${id}`;
  //   return this.http.get(url);
  // }

  // updateIndividualSupplier(id, body): Observable<any> {
  //   const url = `${apiUrl}inventory/suppliers/${id}`;
  //   return this.http.put(url, body);
  // }

  // getSupplierActivity(id): Observable<any>  {
  //   const url = `${apiUrl}inventory/suppliers/${id}/recent-activity`;
  //   return this.http.get(url);
  // }
}
