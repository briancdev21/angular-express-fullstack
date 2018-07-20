export class ContactUserModel {
  accountRating: number;
  billingAddress: {
    address: string
    city: string
    country: string
    postalCode: string
    province: string
  };
  createdAt: string;
  currencyId: number;
  currentInvoices: number;
  currentProjects: number;
  dealsRatio: number;
  email: null;
  followers: null;
  id: number;
  keywordIds: null;
  lastContacted: string;
  loyaltyRating: number;
  note: string;
  owner: string;
  person: {
    businessAssociation: null
    department: string
    firstName: string
    jobTitle: string
    lastName: string
  };
  phoneNumbers: {
    primary: string
    secondary: string
  };
  points: number;
  pricingCategoryId: number;
  revenue: number;
  serviceRatio: number;
  shippingAddress: {
    address: string
    city: string
    country: string
    postalCode: string
    province: string
  };
  socialMediaUrl: {
    facebook: null
    linkedIn: null
    twitter: null
  };
  sourceId: number;
  termId: number;
  timezone: number;
  totalNumberOfDeals: number;
  type: string;
}
