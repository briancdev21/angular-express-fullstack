// src/app/models/leadmodel.ts

export class LeadModel {
  id:	number;
  currencyId: number;
  termId:	number;
  sourceId: number;
  pricingCategoryId: number;
  keywordIds:	number[];
  owner: string;
  followers: string[];
  type: string;
  person: {
    firstName: string,
    lastName:	string,
    jobTitle:	string,
    department:	string,
    businessAssociation: number,
  };
  business:	{
    name: string,
    headContact: number,
    accountReceivable: number,
    personAssociations:	number[],
  };
  status: {
    projects: number,
    invoices:	number,
  };
  shippingAddress: {
    address: string,
    city: string,
    province: string,
    postalCode:	string,
    country: string,
  };
  billingAddress: {
    address: string,
    city: string,
    province: string,
    postalCode:	string,
    country: string,
  };
  email: string;
  socialMediaURL:	{
    linkedIn: string,
    facebook:	string,
    twitter: string,
  };
  phoneNumbers:	{
    primary: string,
    secondary: string
  };
  timezone:	number;
  note:	string;
  lastContacted: string;
  totalNumOfDeals: number;
  accountRating: number;
  leadScore: number;
  createdAt: string;
  updatedAt: string;
}
