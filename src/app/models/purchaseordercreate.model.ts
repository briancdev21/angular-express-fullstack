export class PurchaseOrderCreateModel {
  contactId: number;
  shippingAddress: {
    address: string,
    city:  string,
    province:  string,
    postalCode:  string,
    country:  string
  };
  locationId: number;
  freightCost: number;
  term: number;
  discount: any = {
    value: 0,
    unit: 'AMOUNT'
  };
  internalMemo: string;
  supplierNote: string;
  dueDate: string;
}
