export class EstimateCreateModel {
  currencyId: number;
  contactId: number;
  leadId: number;
  pricingCategoryId: number;
  classificationId: number;
  categoryId: number;
  emails: string[];
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
  expiryDate: string;
  discount: {
    value: number;
    unit: string
  };
  deposit: number;
}
