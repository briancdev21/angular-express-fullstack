import { Injectable, Output, Input, } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { apiUrl } from '../config';
import { map, tap } from 'rxjs/operators';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()

export class InvoicesService {

  private closeDetailedTaskModal = new BehaviorSubject<boolean>(false);
  private deleteTask = new BehaviorSubject<any>([]);
  private updateChart = new BehaviorSubject<any>([]);
  private subject = new Subject<any>();

  closeTaskModal = this.closeDetailedTaskModal.asObservable();
  deleteOpenedTask = this.deleteTask.asObservable();
  ganttUpdated = this.updateChart.asObservable();

  constructor( private http: HttpClient ) {

  }

  getInvoices (): Observable<any> {
    const url = `${apiUrl}sales/invoices`;
    return this.http.get(url);
  }

  createInvoice (body): Observable<any> {
    const url = `${apiUrl}sales/invoices`;
    return this.http.post<any>(url, body);
  }

  getIndividualInvoice(id): Observable<any>  {
    const url = `${apiUrl}sales/invoices/${id}`;
    return this.http.get(url);
  }

  deleteIndividualInvoice(id): Observable<any>  {
    const url = `${apiUrl}sales/invoices/${id}`;
    return this.http.delete(url);
  }

  updateInvoice (id, body): Observable<any> {
    const url = `${apiUrl}sales/invoices/${id}`;
    return this.http.put<any>(url, body);
  }

  getInvoicesProducts (id): Observable<any> {
    const url = `${apiUrl}sales/invoices/${id}/products`;
    return this.http.get(url);
  }

  createInvoiceProduct (id, body): Observable<any> {
    const url = `${apiUrl}sales/invoices/${id}/products`;
    return this.http.post<any>(url, body);
  }

  getIndividualInvoiceProducts(id, productId): Observable<any>  {
    const url = `${apiUrl}sale/invoices/${id}/products/${productId}`;
    return this.http.get(url);
  }

  updateInvoiceProduct (id, productId, body): Observable<any> {
    const url = `${apiUrl}sales/invoices/${id}/products/${productId}`;
    return this.http.put<any>(url, body);
  }

  deleteInvoiceProduct (id, productId, body): Observable<any> {
    const url = `${apiUrl}sales/invoices/${id}/products/${productId}`;
    return this.http.delete<any>(url, body);
  }

  hideDetailedTaskModal(data) {
    this.closeDetailedTaskModal.next(data);
  }

  sendTaskData (data) {
    this.subject.next(data);
  }
  openDetailedTaskModal(): Observable<any> {
    return this.subject.asObservable();
  }

  deleteOpenedModal(value) {
    this.deleteTask.next(value);
  }

  updateGantt(value) {
    this.updateChart.next(value);
  }
}
