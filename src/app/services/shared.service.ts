import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

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
    const url = `${environment.apiUrl}/organization/keywords/`;
    return this.http.get(url);
  }

  createKeyword (body): Observable<any> {
    const url = `${environment.apiUrl}/organization/keywords/`;
    return this.http.post<any>(url, body);
  }

  deleteKeyword (id): Observable<any> {
    const url = `${environment.apiUrl}/organization/keywords/${id}`;
    return this.http.delete<any>(url);
  }

  getIndividualKeyword(id): Observable<any>  {
    const url = `${environment.apiUrl}/organization/keywords/${id}`;
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
    const url = `${environment.apiUrl}/organization/locations/`;
    return this.http.get(url);
  }

  getLocationsWithParams(params): Observable<any> {
    const url = `${environment.apiUrl}/organization/locations/`;
    return this.http.get(url, {params: params});
  }

  createLocation (body): Observable<any> {
    const url = `${environment.apiUrl}/organization/locations/`;
    return this.http.post<any>(url, body);
  }

  getIndividualLocation(id): Observable<any>  {
    const url = `${environment.apiUrl}/organization/locations/${id}`;
    return this.http.get(url);
  }

  deleteLocation (id): Observable<any> {
    const url = `${environment.apiUrl}/organization/locations/${id}`;
    return this.http.delete<any>(url);
  }

  updateIndividualLocation(id, body) {
    const url = `${environment.apiUrl}/organization/locations/${id}`;
    return this.http.post<any>(url, body);
  }

  // Product Type
  getProductTypes(): Observable<any> {
    const url = `${environment.apiUrl}/organization/product-types/`;
    return this.http.get(url);
  }

  createProductType (body): Observable<any> {
    const url = `${environment.apiUrl}/organization/product-types/`;
    return this.http.post<any>(url, body);
  }

  getIndividualProductType(id): Observable<any>  {
    const url = `${environment.apiUrl}/organization/product-types/${id}`;
    return this.http.get(url);
  }

  deleteProductType (id): Observable<any> {
    const url = `${environment.apiUrl}/organization/product-types/${id}`;
    return this.http.delete<any>(url);
  }

  // Currency
  getCurrencies(): Observable<any> {
    const url = `${environment.apiUrl}/organization/currencies/`;
    return this.http.get(url);
  }
  getCurrency(id): Observable<any> {
    const url = `${environment.apiUrl}/organization/currencies/${id}`;
    return this.http.get(url);
  }
  createCurrency (body): Observable<any> {
    const url = `${environment.apiUrl}/organization/currencies/`;
    return this.http.post<any>(url, body);
  }

  getIndividualCurrency(id): Observable<any>  {
    const url = `${environment.apiUrl}/organization/currencies/${id}`;
    return this.http.get(url);
  }

  deleteCurrency (id): Observable<any> {
    const url = `${environment.apiUrl}/organization/currencies/${id}`;
    return this.http.delete<any>(url);
  }


  // User
  getUsers (): Observable<any> {
    const url = `${environment.apiUrl}/users/`;
    return this.http.get(url).map(data => data['results']);
  }

  getUser (username): Observable<any> {
    const url = `${environment.apiUrl}/users/${username}`;
    return this.http.get(url);
  }

  getUsersByTime(startTime: any, endTime: any): Observable<any> {
    const url = `${environment.apiUrl}/users?availabilityStartDate=${startTime}&availabilityEndDate=${endTime}`;
    return this.http.get(url);
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

  getMulipleContacts(ids: any): Observable<any> {
    const url = `${environment.apiUrl}/crm/contacts/?ids=${ids}`;
    return this.http.get(url).map(data => data['results']);
  }

  getContact(id): Observable<any> {
    const url = `${environment.apiUrl}/crm/contacts/${id}`;
    return this.http.get(url);
  }

  createContact (body): Observable<any> {
    const url = `${environment.apiUrl}/contacts/`;
    return this.http.post<any>(url, body);
  }

  updateContact (body): Observable<any> {
    const url = `${environment.apiUrl}/contacts/`;
    return this.http.put<any>(url, body);
  }

  // Terms
  getTerms(): Observable<any> {
    const url = `${environment.apiUrl}/organization/terms`;
    return this.http.get(url);
  }
  getTerm(id): Observable<any> {
    const url = `${environment.apiUrl}/organization/terms/${id}`;
    return this.http.get(url);
  }
  createTerm (body): Observable<any> {
    const url = `${environment.apiUrl}/organization/terms`;
    return this.http.post<any>(url, body);
  }

  getIndividualTerm(id): Observable<any>  {
    const url = `${environment.apiUrl}/organization/terms/${id}`;
    return this.http.get(url);
  }

  deleteTerm (id): Observable<any> {
    const url = `${environment.apiUrl}/organization/terms/${id}`;
    return this.http.delete<any>(url);
  }

  // Pricing Category
  getPricingCategories(): Observable<any> {
    const url = `${environment.apiUrl}/organization/pricing-categories`;
    return this.http.get(url);
  }

  createPricingCategory (body): Observable<any> {
    const url = `${environment.apiUrl}/organization/pricing-categories`;
    return this.http.post<any>(url, body);
  }

  getIndividualPricingCategory(id): Observable<any>  {
    const url = `${environment.apiUrl}/organization/pricing-categories/${id}`;
    return this.http.get(url);
  }

  updateIndividualPricingCategory(id, body): Observable<any>  {
    const url = `${environment.apiUrl}/organization/pricing-categories/${id}`;
    return this.http.put(url, body);
  }

  //  proposal Category
  getCategories(): Observable<any> {
    const url = `${environment.apiUrl}/organization/proposal-categories`;
    return this.http.get(url);
  }

  createCategory (body): Observable<any> {
    const url = `${environment.apiUrl}/organization/proposal-categories`;
    return this.http.post<any>(url, body);
  }

  getIndividualCategory(id): Observable<any>  {
    const url = `${environment.apiUrl}/organization/proposal-categories/${id}`;
    return this.http.get(url);
  }

  deleteIndividualCategory (id): Observable<any> {
    const url = `${environment.apiUrl}/organization/proposal-categories/${id}`;
    return this.http.delete<any>(url);
  }

  //  proposal SubCategory
  getSubCategories(): Observable<any> {
    const url = `${environment.apiUrl}/organization/proposal-subcategories`;
    return this.http.get(url);
  }

  createSubCategory (body): Observable<any> {
    const url = `${environment.apiUrl}/organization/proposal-subcategories`;
    return this.http.post<any>(url, body);
  }

  getIndividualSubCategory(subId): Observable<any>  {
    const url = `${environment.apiUrl}/organization/proposal-subcategories/${subId}`;
    return this.http.get(url);
  }

  deleteIndividualSubCategory (subId): Observable<any> {
    const url = `${environment.apiUrl}/organization/proposal-subcategories/${subId}`;
    return this.http.delete<any>(url);
  }

  // Tax-rate
  getTaxRates(): Observable<any> {
    const url = `${environment.apiUrl}/organization/tax-rates`;
    return this.http.get(url);
  }

  createTaxRate (body): Observable<any> {
    const url = `${environment.apiUrl}/organization/tax-rates`;
    return this.http.post<any>(url, body);
  }

  getIndividualTaxRate(id): Observable<any>  {
    const url = `${environment.apiUrl}/organization/tax-rates/${id}`;
    return this.http.get(url);
  }

  deleteTaxRate (id): Observable<any> {
    const url = `${environment.apiUrl}/organization/tax-rates/${id}`;
    return this.http.delete<any>(url);
  }

  // Classification
  getClassifications(): Observable<any> {
    const url = `${environment.apiUrl}/organization/classifications`;
    return this.http.get(url);
  }

  createClassification (body): Observable<any> {
    const url = `${environment.apiUrl}/organization/classifications`;
    return this.http.post<any>(url, body);
  }

  getIndividualClassification(id): Observable<any>  {
    const url = `${environment.apiUrl}/organization/classifications/${id}`;
    return this.http.get(url);
  }

  deleteClassification (id): Observable<any> {
    const url = `${environment.apiUrl}/organization/classifications/${id}`;
    return this.http.delete<any>(url);
  }


  // Sources
  getSources(): Observable<any> {
    const url = `${environment.apiUrl}/organization/sources`;
    return this.http.get(url);
  }

  createSource (body): Observable<any> {
    const url = `${environment.apiUrl}/organization/sources`;
    return this.http.post<any>(url, body);
  }

  getIndividualSource(id): Observable<any>  {
    const url = `${environment.apiUrl}/organization/sources/${id}`;
    return this.http.get(url);
  }

  deleteSource (id): Observable<any> {
    const url = `${environment.apiUrl}/organization/sources/${id}`;
    return this.http.delete<any>(url);
  }

  // Purchase Order
  createPurchaseOrder (body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/purchase-orders`;
    return this.http.post<any>(url, body);
  }

  getPurchaseOrders (): Observable<any> {
    const url = `${environment.apiUrl}/inventory/purchase-orders`;
    return this.http.get<any>(url);
  }

  getPurchaseOrdersWithParams (params): Observable<any> {
    const url = `${environment.apiUrl}/inventory/purchase-orders`;
    return this.http.get<any>(url, {params: params});
  }

  getPurchaseOrder (id): Observable<any> {
    const url = `${environment.apiUrl}/inventory/purchase-orders/${id}`;
    return this.http.get<any>(url);
  }

  updatePurchaseOrder (id, body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/purchase-orders/${id}`;
    return this.http.put<any>(url, body);
  }

  deletePurchaseOrder (id): Observable<any> {
    const url = `${environment.apiUrl}/inventory/purchase-orders/${id}`;
    return this.http.delete<any>(url);
  }


  // Get Products
  getInventoryProducts (): Observable<any> {
    const url = `${environment.apiUrl}/inventory/products`;
    return this.http.get<any>(url);
  }

  getInventoryProductsWithParams (params): Observable<any> {
    const url = `${environment.apiUrl}/inventory/products`;
    return this.http.get(url, {params: params});
  }

  getInventoryProduct (id): Observable<any> {
    const url = `${environment.apiUrl}/inventory/products/${id}`;
    return this.http.get<any>(url);
  }

  // Get Sku for a product
  getInventoryProductSkus (productId): Observable<any> {
    const url = `${environment.apiUrl}/inventory/products/${productId}/variants`;
    return this.http.get<any>(url);
  }

  // Purchase Order Products
  addPurchaseOrderProduct (purchaseOrderId, body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/purchase-orders/${purchaseOrderId}/products`;
    return this.http.post<any>(url, body);
  }

  getPurchaseOrderProducts (purchaseOrderId): Observable<any> {
    const url = `${environment.apiUrl}/inventory/purchase-orders/${purchaseOrderId}/products`;
    return this.http.get<any>(url);
  }

  getPurchaseOrderProduct (purchaseOrderId, id): Observable<any> {
    const url = `${environment.apiUrl}/inventory/purchase-orders/${purchaseOrderId}/products/${id}`;
    return this.http.get<any>(url);
  }

  updatePurchaseOrderProduct (purchaseOrderId, id, body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/purchase-orders/${purchaseOrderId}/products/${id}`;
    return this.http.put<any>(url, body);
  }

  deletePurchaseOrderProduct (purchaseOrderId, id): Observable<any> {
    const url = `${environment.apiUrl}/inventory/purchase-orders/${purchaseOrderId}/products/${id}`;
    return this.http.delete<any>(url);
  }

  // Stock Transfers
  createTransfer (body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-transfers`;
    return this.http.post<any>(url, body);
  }
  getTransfers (): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-transfers`;
    return this.http.get<any>(url);
  }

  getTransfersWithParams (params): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-transfers`;
    return this.http.get<any>(url, {params: params});
  }

  getTransfer (id): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-transfers/${id}`;
    return this.http.get<any>(url);
  }

  updateTransfer (id, body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-transfers/${id}`;
    return this.http.put<any>(url, body);
  }

  deleteTransfer (id): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-transfers/${id}`;
    return this.http.delete<any>(url);
  }

  // Stock Transfer Products
  addTransferProduct (transferId, body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-transfers/${transferId}/products`;
    return this.http.post<any>(url, body);
  }

  getTransferProducts (transferId): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-transfers/${transferId}/products`;
    return this.http.get<any>(url);
  }

  getTransferProduct (transferId, id): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-transfers/${transferId}/products/${id}`;
    return this.http.get<any>(url);
  }

  updateTransferProduct (transferId, id, body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-transfers/${transferId}/products/${id}`;
    return this.http.put<any>(url, body);
  }

  deleteTransferProduct (transferId, id): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-transfers/${transferId}/products/${id}`;
    return this.http.delete<any>(url);
  }

  // Inventory Stock Adjustment
  createInventoryAdjustment (body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-adjustments`;
    return this.http.post<any>(url, body);
  }
  getInventoryAdjustments (): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-adjustments`;
    return this.http.get<any>(url);
  }

  getInventoryAdjustmentsWithParmas (params): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-adjustments`;
    return this.http.get<any>(url, {params: params});
  }

  getInventoryAdjustment (id): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-adjustments/${id}`;
    return this.http.get<any>(url);
  }

  updateInventoryAdjustment (id, body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-adjustments/${id}`;
    return this.http.put<any>(url, body);
  }

  deleteInventoryAdjustment (id): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-adjustments/${id}`;
    return this.http.delete<any>(url);
  }

  // Stock InventoryAdjustment Products
  addInventoryAdjustmentProduct (transferId, body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-adjustments/${transferId}/products`;
    return this.http.post<any>(url, body);
  }

  getInventoryAdjustmentProducts (transferId): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-adjustments/${transferId}/products`;
    return this.http.get<any>(url);
  }

  getInventoryAdjustmentProduct (transferId, id): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-adjustments/${transferId}/products/${id}`;
    return this.http.get<any>(url);
  }

  updateInventoryAdjustmentProduct (transferId, id, body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-adjustments/${transferId}/products/${id}`;
    return this.http.put<any>(url, body);
  }

  deleteInventoryAdjustmentProduct (transferId, id): Observable<any> {
    const url = `${environment.apiUrl}/inventory/stock-adjustments/${transferId}/products/${id}`;
    return this.http.delete<any>(url);
  }

  // Inventory Suppliers
  getSuppliers (): Observable<any> {
    const url = `${environment.apiUrl}/inventory/suppliers`;
    return this.http.get<any>(url);
  }
  addSupplier (body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/suppliers`;
    return this.http.post<any>(url, body);
  }
  updateSupplier (supplierId, body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/suppliers/${supplierId}`;
    return this.http.put<any>(url, body);
  }
  getSupplier (id): Observable<any> {
    const url = `${environment.apiUrl}/inventory/suppliers/${id}`;
    return this.http.get<any>(url);
  }
  deleteSupplier (supplierId, body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/suppliers/${supplierId}`;
    return this.http.delete<any>(url);
  }

  addSupplierActivity (id, body): Observable<any> {
    const url = `${environment.apiUrl}/inventory/suppliers${id}/recent-activities`;
    return this.http.post<any>(url, body);
  }

  getSupplierActivities (id): Observable<any> {
    const url = `${environment.apiUrl}/inventory/suppliers/${id}/recent-activities`;
    return this.http.get<any>(url);
  }

  getProjectTypes(): Observable<any> {
    const url = `${environment.apiUrl}/organization/project-types`;
    return this.http.get(url);
  }

  createProjectType (body): Observable<any> {
    const url = `${environment.apiUrl}/organization/project-types`;
    return this.http.post<any>(url, body);
  }

  deleteProjectType (id): Observable<any> {
    const url = `${environment.apiUrl}/organization/project-types/${id}`;
    return this.http.delete<any>(url);
  }

  // Statistics

  getSalesStatistics(start, end, interval, fields): Observable<any> {
    const params = new HttpParams().set('startFrame', start).set('endFrame', end).set('interval', interval).set('fields', fields);
    const url = `${environment.apiUrl}/organization/statistics/sales`;
    return this.http.get(url, {params: params});
  }

  getCrmStatistics(start, end, interval, fields): Observable<any> {
    const params = new HttpParams().set('startFrame', start).set('endFrame', end).set('interval', interval).set('fields', fields);
    const url = `${environment.apiUrl}/organization/statistics/CRM`;
    return this.http.get(url, {params: params});
  }

  getInventoryStatistics(start, end, interval, fields): Observable<any> {
    const params = new HttpParams().set('startFrame', start).set('endFrame', end).set('interval', interval).set('fields', fields);
    const url = `${environment.apiUrl}/organization/statistics/inventory`;
    return this.http.get(url, {params: params});
  }

  getTasksStatistics(start, end, interval, fields): Observable<any> {
    const params = new HttpParams().set('startFrame', start).set('endFrame', end).set('interval', interval).set('fields', fields);
    const url = `${environment.apiUrl}/organization/statistics/tasks`;
    return this.http.get(url, {params: params});
  }

  getProjectsStatistics(start, end, interval, fields): Observable<any> {
    const params = new HttpParams().set('startFrame', start).set('endFrame', end).set('interval', interval).set('fields', fields);
    const url = `${environment.apiUrl}/organization/statistics/projects`;
    return this.http.get(url, {params: params});
  }
  getInvoiceCategories(): Observable<any> {
    const url = `${environment.apiUrl}/organization/invoice-categories`;
    return this.http.get(url);
  }
}
