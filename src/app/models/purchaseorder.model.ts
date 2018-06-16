export class PurchaseOrderModel {
  id: number;
  status: string;
  contactId: number;
  shippingAddress: {
    address: string;
    city: string;
    province: string;
    postalCode: string;
    country: string
  };
  location: number;
  term: number;
  termId: number;
  freightCost: number;
  createdAt: Date;
  dueDate: string;
  discount: {
    value: number;
    unit: string;
  };
  internalMemo: string;
  supplierNote: string;
  subTotal: number;
  totalTax: number;
  total: number;
}