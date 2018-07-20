export class ProductDetailInfo {
  sku: string = undefined;
  model: string = undefined;
  name: string = undefined;
  measure: number = undefined;
  quantity: number = undefined;
  unitprice: number = undefined;
  discount: number = undefined;
  total: number = undefined;
  taxrate = 0;
  type = 'product';
  serviceDate: Date;
  supplierId: number = undefined;
  taxRateId: number = undefined;
  purchaseOrderProductId: number;
  readonly = false;
}
