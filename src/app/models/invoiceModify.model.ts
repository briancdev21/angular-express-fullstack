export class InvoiceCreateModel {
  currencyId: number; // required
  contactId: number;
  pricingCategoryId: number;
  classificationId: number; // required
  categoryId: number; // required
  termId: number; // required
  emails: string[];
  startDate: string;
  acceptOnlinePayment: true;
  chargeLateFee: true;
  lateFee: {
    value: number;
    unit: string
  };
  reminder: string[];
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
