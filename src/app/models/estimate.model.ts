export class EstimateModel {
  currencyId: 1;
  contactId: number;
  pricingCategoryId: 1;
  leadId: 1;
  classificationId: number;
  categoryId: number;
  emails: [
    string
  ];
  startDate: string;
  acceptOnlinePayment: true;
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
  expiryDate: string;
  termId: number;
}
