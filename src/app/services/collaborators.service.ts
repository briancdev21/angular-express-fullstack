import { Injectable, Output, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { apiUrl } from '../config';


import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()

export class CollaboratorsService {

  constructor( private http: HttpClient ) {

  }

  getCalendars (): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/calendars`;
    return this.http.get(url);
  }

  createCalendar (body): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/calendars`;
    return this.http.post<any>(url, body);
  }

  updateIndividualCalendar (id, body): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/calendars/${id}`;
    return this.http.put<any>(url, body);
  }

  getIndividualCalendar(id): Observable<any>  {
    const url = `${environment.apiUrl}/collaborators/calendars/${id}`;
    return this.http.get(url);
  }

  deleteIndividualCalendar(id): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/calendars/${id}`;
    return this.http.delete(url);
  }

  getCalendarEvents (id): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/calendars/${id}/events`;
    return this.http.get(url);
  }

  createCalendarEvent (id, body): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/calendars/${id}/events`;
    return this.http.post<any>(url, body);
  }

  updateIndividualCalendarEvent (id, eventId, body): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/calendars/${id}/events/${eventId}`;
    return this.http.put<any>(url, body);
  }

  getIndividualCalendarEvent(id, eventId): Observable<any>  {
    const url = `${environment.apiUrl}/collaborators/calendars/${id}/events/${eventId}`;
    return this.http.get(url);
  }

  deleteIndividualCalendarEvent(id, eventId): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/calendars/${id}/events/${eventId}`;
    return this.http.delete(url);
  }

  getWorkOrders (): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/work-orders`;
    return this.http.get(url);
  }

  createWorkOrder (body): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/work-orders`;
    return this.http.post<any>(url, body);
  }

  getProjectWorkOrders (projectId: string): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/work-orders?projectId=${projectId}`;
    return this.http.get(url);
  }

  updateIndividualWorkOrder (id, body): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}`;
    return this.http.put<any>(url, body);
  }

  getIndividualWorkOrder(id): Observable<any>  {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}`;
    return this.http.get(url);
  }

  getWorkOrderTasks (id): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}/tasks`;
    return this.http.get(url);
  }

  createWorkOrderTask (id, body): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}/tasks`;
    return this.http.post<any>(url, body);
  }

  updateIndividualWorkOrderTask (id, taskId, body): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}/tasks/${taskId}`;
    return this.http.put<any>(url, body);
  }

  getIndividualWorkOrderTask (id, taskId): Observable<any>  {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}/tasks/${taskId}`;
    return this.http.get(url);
  }

  deleteIndividualWorkOrderTask (id, taskId): Observable<any>  {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}/tasks/${taskId}`;
    return this.http.delete(url);
  }

  getWorkOrderProducts (id): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}/products`;
    return this.http.get(url);
  }

  createWorkOrderProduct (id, body): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}/products`;
    return this.http.post<any>(url, body);
  }

  updateIndividualWorkOrderProduct (id, productId, body): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}/products/${productId}`;
    return this.http.put<any>(url, body);
  }

  getIndividualWorkOrderProduct (id, productId): Observable<any>  {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}/products/${productId}`;
    return this.http.get(url);
  }

  deleteIndividualWorkOrderProduct (id, productId): Observable<any>  {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}/products/${productId}`;
    return this.http.delete(url);
  }

  getWorkOrderIssues (id): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}/issues`;
    return this.http.get(url);
  }

  createWorkOrderIssue (id, body): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}/issues`;
    return this.http.post<any>(url, body);
  }

  updateIndividualWorkOrderIssue (id, issueId, body): Observable<any> {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}/issues/${issueId}`;
    return this.http.put<any>(url, body);
  }

  getIndividualWorkOrderIssue (id, issueId): Observable<any>  {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}/issues/${issueId}`;
    return this.http.get(url);
  }

  deleteIndividualWorkOrderIssue (id, issueId): Observable<any>  {
    const url = `${environment.apiUrl}/collaborators/work-orders/${id}/issues/${issueId}`;
    return this.http.delete(url);
  }

}
