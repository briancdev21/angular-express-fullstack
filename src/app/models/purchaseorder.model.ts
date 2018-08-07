export class PurchaseOrderModel {
  id: number;
  status: string;
  projectId: string;
  contactId: string;
  shippingAddress: {
    address: string;
    city: string;
    province: string;
    postalCode: string;
    country: string
  };
  location: string;
  term: string;
  termId: string;
  freightCost: string;
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
