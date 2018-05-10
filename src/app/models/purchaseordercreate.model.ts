export class PurchaseOrderCreateModel {
  contactId:number = 1;
  shippingAddress:any = {
    address: '',
    city:  '',
    province:  '',
    postalCode:  '',
    country:  ''
  };
  location:number = 1;
  freightCost:number = 0;
  term:number = 1;
  discount:any = {
    value: 0,
    unit: "AMOUNT"
  };
  internalMemo:string = '';
  supplierNote:string = '';
  dueDate:string = new Date().toJSON().slice(0, 10);
}