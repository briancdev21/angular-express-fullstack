import { Component } from '@angular/core';
import { CommonComponent } from '../common/common.component';


@Component({
  selector: 'app-test',
  templateUrl: './proposal.component.html',
  styleUrls: [
    './proposal.component.css'
  ]
})
export class ProposalComponent {
  menuCollapsed = true;

  public proposalInfo: object = {
    proposalId : '123465',
    contactName : 'Diana llic',
    projectName: 'Live your Nu Life',
    projectType: 'New Construction',
    proposalAmount: '24,202.37',
    dealStatus: 'New',
    revision: '0',
    createdDate: 'January 19, 2017',
    owner: {
      imageUrl: 'assets/users/user1.png',
      profileLink: 'crm/contacts/michael',
      name: 'Michael'
    }
  };

  public productType = [
    'Controller', 'Video', 'Audio', 'Equipment'
  ];
  public proposalProductList: Array<object> = [
    {
      sku: 88021111,
      brand: 'Control4',
      model: 'C4-HC800',
      productName: 'Home Controller 800',
      productType: 'Controller',
      qty: 1,
      unitPrice: 1799.00,
      discount: 0,
      total: 2400.50,
      taxRate: 'GST',
      category: 'Mechanical Room',
      subcategory: 'Automation'
    },
    {
      sku: 88021117,
      brand: 'Sumsung',
      model: 'SM-UN55EH6300',
      productName: '55" Smart LED TV',
      productType: 'Video',
      qty: 4,
      unitPrice: 1299.00,
      discount: 0,
      total: 5592.00,
      taxRate: 'GST',
      category: 'Multi Category',
      subcategory: 'Video'
    },
    {
      sku: 88021118,
      brand: 'Control4',
      model: 'C4-HC800',
      productName: 'Control4 System Remote Controller',
      productType: 'Video',
      qty: 4,
      unitPrice: 199.00,
      discount: 0,
      total: 994.00,
      taxRate: 'GST',
      category: 'Multi Category',
      subcategory: 'Control'
    },
    {
      sku: 88021122,
      brand: 'Niles',
      model: 'NL-6.5INCSPK',
      productName: 'In-ceiling 6.5" Round Speakers',
      productType: 'Audio',
      qty: 8,
      unitPrice: 199.00,
      discount: 0,
      total: 1592.00,
      taxRate: 'GST',
      category: 'Multi Category',
      subcategory: 'Audio'
    },
    {
      sku: 88021123,
      brand: 'Control4',
      model: 'C4-AMP8',
      productName: '8 Zone Switchable Matrix',
      productType: 'Audio',
      qty: 1,
      unitPrice: 2499.00,
      discount: 0,
      total: 3093.00,
      taxRate: 'GST',
      category: 'Mechanical Room',
      subcategory: 'Audio'
    },
    {
      sku: 88021133,
      brand: 'Nuance',
      model: 'NA-RACK42',
      productName: '42 Space full space stanind rack',
      productType: 'Equipment',
      qty: 1,
      unitPrice: 999.00,
      discount: 0,
      total: 1999.00,
      taxRate: 'GST',
      category: 'Mechanical Room',
      subcategory: 'Equipment'
    },
    {
      sku: 88021154,
      brand: 'Key Digital',
      model: 'KD-8x8MAT',
      productName: '8x8 Video Matrix',
      productType: 'Video',
      qty: 2,
      unitPrice: 2999.00,
      discount: 0,
      total: 7405.38,
      taxRate: 'GST',
      category: 'Unknown',
      subcategory: 'Unknown'
    },
  ];

  public productsInfoAll: Array<object> = [
    {
      sku: 88021111,
      brand: 'Control4',
      model: 'C4-HC800',
      productName: 'Home Controller 800',
      productType: 'Controller',
      qty: 1,
      unitPrice: 1799.00,
      discount: 0,
      total: 2400.50,
      taxRate: 'GST',
      category: 'Mechanical Room',
      subcategory: 'Automation'
    },
    {
      sku: 88021117,
      brand: 'Sumsung',
      model: 'SM-UN55EH6300',
      productName: '55" Smart LED TV',
      productType: 'Video',
      qty: 4,
      unitPrice: 1299.00,
      discount: 0,
      total: 5592.00,
      taxRate: 'GST',
      category: 'Multi Category',
      subcategory: 'Video'
    },
    {
      sku: 88021118,
      brand: 'Control4',
      model: 'C4-HC800',
      productName: 'Control4 System Remote Controller',
      productType: 'Video',
      qty: 4,
      unitPrice: 199.00,
      discount: 0,
      total: 994.00,
      taxRate: 'GST',
      category: 'Multi Category',
      subcategory: 'Control'
    },
    {
      sku: 88021122,
      brand: 'Niles',
      model: 'NL-6.5INCSPK',
      productName: 'In-ceiling 6.5" Round Speakers',
      productType: 'Audio',
      qty: 8,
      unitPrice: 199.00,
      discount: 0,
      total: 1592.00,
      taxRate: 'GST',
      category: 'Multi Category',
      subcategory: 'Audio'
    },
    {
      sku: 88021123,
      brand: 'Control4',
      model: 'C4-AMP8',
      productName: '8 Zone Switchable Matrix',
      productType: 'Audio',
      qty: 1,
      unitPrice: 2499.00,
      discount: 0,
      total: 3093.00,
      taxRate: 'GST',
      category: 'Mechanical Room',
      subcategory: 'Audio'
    },
    {
      sku: 88021133,
      brand: 'Nuance',
      model: 'NA-RACK42',
      productName: '42 Space full space stanind rack',
      productType: 'Equipment',
      qty: 1,
      unitPrice: 999.00,
      discount: 0,
      total: 1999.00,
      taxRate: 'GST',
      category: 'Mechanical Room',
      subcategory: 'Equipment'
    },
    {
      sku: 88021154,
      brand: 'Key Digital',
      model: 'KD-8x8MAT',
      productName: '8x8 Video Matrix',
      productType: 'Video',
      qty: 2,
      unitPrice: 2999.00,
      discount: 0,
      total: 7405.38,
      taxRate: 'GST',
      category: 'Unknown',
      subcategory: 'Unknown'
    },
    {
      sku: 88021111,
      brand: 'Control4',
      model: 'C4-HC800',
      productName: 'Home Controller 800',
      productType: 'Controller',
      qty: 1,
      unitPrice: 1799.00,
      discount: 0,
      total: 2400.50,
      taxRate: 'GST',
      category: 'Mechanical Room',
      subcategory: 'Automation'
    },
    {
      sku: 88021117,
      brand: 'Sumsung',
      model: 'SM-UN55EH6300',
      productName: '55" Smart LED TV',
      productType: 'Video',
      qty: 4,
      unitPrice: 1299.00,
      discount: 0,
      total: 5592.00,
      taxRate: 'GST',
      category: 'Multi Category',
      subcategory: 'Video'
    },
    {
      sku: 88021118,
      brand: 'Control4',
      model: 'C4-HC800',
      productName: 'Control4 System Remote Controller',
      productType: 'Video',
      qty: 4,
      unitPrice: 199.00,
      discount: 0,
      total: 994.00,
      taxRate: 'GST',
      category: 'Multi Category',
      subcategory: 'Control'
    },
    {
      sku: 88021122,
      brand: 'Niles',
      model: 'NL-6.5INCSPK',
      productName: 'In-ceiling 6.5" Round Speakers',
      productType: 'Audio',
      qty: 8,
      unitPrice: 199.00,
      discount: 0,
      total: 1592.00,
      taxRate: 'GST',
      category: 'Multi Category',
      subcategory: 'Audio'
    },
    {
      sku: 88021123,
      brand: 'Control4',
      model: 'C4-AMP8',
      productName: '8 Zone Switchable Matrix',
      productType: 'Audio',
      qty: 1,
      unitPrice: 2499.00,
      discount: 0,
      total: 3093.00,
      taxRate: 'GST',
      category: 'Mechanical Room',
      subcategory: 'Audio'
    },
    {
      sku: 88021133,
      brand: 'Nuance',
      model: 'NA-RACK42',
      productName: '42 Space full space stanind rack',
      productType: 'Equipment',
      qty: 1,
      unitPrice: 999.00,
      discount: 0,
      total: 1999.00,
      taxRate: 'GST',
      category: 'Mechanical Room',
      subcategory: 'Equipment'
    },
    {
      sku: 88021154,
      brand: 'Key Digital',
      model: 'KD-8x8MAT',
      productName: '8x8 Video Matrix',
      productType: 'Video',
      qty: 2,
      unitPrice: 2999.00,
      discount: 0,
      total: 7405.38,
      taxRate: 'GST',
      category: 'Unknown',
      subcategory: 'Unknown'
    },
  ];

  public projectCategory = [
    'Livingroom', 'kitchen', 'Master Bedroom'
  ];

  public projectSubCategory = [
    'Lighting System', 'Automation System'
  ];

  public projectDetails = {
    discount: {
      type: ['$', '%']
    },
    projectId: 'PR 123456',
    projectCategoriesAll: ['Livingroom', 'Kitchen', 'Master Bedroom', 'Master Bathroom', 'Family Room', 'Garage'],
    projectSubCategoriesAll: ['Lighting System', 'Automation System', 'Networking System'],
    completionDate: 'February 12, 2018',
    paymentSchedule: [50 , 30, 20],
    projectManager: {
      imageUrl: 'assets/users/user2.png',
      profileLink: 'crm/contacts/user2',
      name: 'Michael'
    },
    designer: {
      imageUrl: 'assets/users/user3.png',
      profileLink: 'crm/contacts/user3',
      name: 'Michael'
    }
  };


  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }
}

