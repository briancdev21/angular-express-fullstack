export class InvoiceModel {
  currencyId: 1;
  contactId: number;
  pricingCategoryId: 1;
  classificationId: number;
  categoryId: number;
  emails: [
    string
  ];
  startDate: string;
  acceptOnlinePayment: true;
  chargeLateFee: true;
  lateFee: {
    value: number;
    unit: string
  };
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
  deposit: number;
}
