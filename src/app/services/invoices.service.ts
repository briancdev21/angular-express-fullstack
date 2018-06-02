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

  // Get Products
  getInventoryProducts (): Observable<any> {
    const url = `${apiUrl}inventory/products`;
    return this.http.get<any>(url);
  }

  getInventoryProduct (id): Observable<any> {
    const url = `${apiUrl}inventory/products/${id}`;
    return this.http.get<any>(url);
  }

  // Get Sku for a product
  getInventoryProductSkus (productId): Observable<any> {
    const url = `${apiUrl}inventory/products/${productId}/variants`;
    return this.http.get<any>(url);
  }

  // Purchase Order Products
  addInvoiceProduct (invoiceId, body): Observable<any> {
    const url = `${apiUrl}sales/invoices/${invoiceId}/products`;
    return this.http.post<any>(url, body);
  }

  getInvoiceProducts (invoiceId): Observable<any> {
    const url = `${apiUrl}sales/invoices/${invoiceId}/products`;
    return this.http.get<any>(url);
  }

  getInvoiceProduct (invoiceId, id): Observable<any> {
    const url = `${apiUrl}sales/invoices/${invoiceId}/products/${id}`;
    return this.http.get<any>(url);
  }

  updateInvoiceProduct (invoiceId, id, body): Observable<any> {
    const url = `${apiUrl}sales/invoices/${invoiceId}/products/${id}`;
    return this.http.put<any>(url, body);
  }

  deleteInvoiceProduct (invoiceId, id): Observable<any> {
    const url = `${apiUrl}sales/invoices/${invoiceId}/products/${id}`;
    return this.http.delete<any>(url);
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
