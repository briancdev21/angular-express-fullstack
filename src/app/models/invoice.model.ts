export class InvoiceModel {
  id: string;
  currencyId: number;
  contactId: number;
  pricingCategoryId: number;
  classificationId: number;
  categoryId: number;
  termId: number;
  owner: string;
  recurringInvoiceIds: number[];
  emails: [
    string
  ];
  startDate: string;
  dueDate: string;
  acceptOnlinePayment: boolean;
  chargeLateFee: boolean;
  lateFee: {
    value: number;
    unit: string
  };
  recurring: [
    string
  ];
  reminder: [
    string
  ];
  shippingAddress: {
    address: string;
    city: string;
    province: string;
    postalCode: string;
    country: string
  };
  billingAddress: {
    address: string;
    city: string;
    province: string;
    postalCode: string;
    country: string
  };
  internalNote: string;
  customerNote: string;
  terms: string;
  discount: {
    value: number;
    unit: string
  };
  productSubTotal: number;
  serviceSubTotal: number;
  taxTotal: number;
  total: number;
  deposit: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
}
