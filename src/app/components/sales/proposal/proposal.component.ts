import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../../components/common/common.component';
import { SubmenuComponent } from '../../submenu/submenu.component';
import { ProposalService } from './proposal.service';

@Component({
  selector: 'app-test',
  templateUrl: './proposal.component.html',
  styleUrls: [
    './proposal.component.css'
  ]
})
export class ProposalComponent implements OnInit {

  constructor( private proposalService: ProposalService ) {

  }
  menuCollapsed = true;

  public searchQueryString = '';
  proposalProductListBackup = [];

  public proposalInfo: any = {
    proposalId : '123465',
    contactName : 'DIANA ILIC',
    projectName: 'Live your Nu Life',
    projectType: 'New Construction',
    proposalAmount: 24202.37,
    dealStatus: 'New',
    revision: '0',
    createdDate: 'January 19, 2017',
    owner: [
      {
      imageUrl: 'assets/users/user1.png',
      profileLink: 'crm/contacts/michael',
      name: 'Michael'
      }
    ],
  };

  public productType = [
    'Controller', 'Video', 'Audio', 'Equipment'
  ];

  public proposalCategoryList = [
    'Mechanical Room', 'Multi Category', 'Unknown', 'Living Room', 'Master Room', 'Family Room', 'Theater Room'
  ];

  public proposalSubCategoryList = [
    'Automation', 'Video', 'Audio', 'Equipment', 'Control'
  ];

  public proposalProductList: Array<object> = [
    {
      id: 1,
      sku: 88021111,
      brand: 'Control4',
      model: 'C4-HC800',
      productName: 'Home Controller 800',
      productType: 'Controller',
      qty: 1,
      unitPrice: 1799.00,
      discount: 0,
      total: 2444.5,
      taxRate: 'GST',
      category: 'Mechanical Room',
      subcategory: 'Automation'
    },
    {
      id: 2,
      sku: 88020000,
      parentId: 1,
      brand: 'Nu-Automations',
      model: 'Nu-SPA',
      productName: 'SPA Team Installation',
      productType: 'Service',
      qty: 3.5,
      unitPrice: 99.00,
      discount: 0,
      total: 346.50,
      taxRate: 'GST',
      category: 'Mechanical Room',
      subcategory: 'Automation',
      option: 'automaticAcc'
    },
    {
      id: 3,
      sku: 88020001,
      parentId: 1,
      brand: 'Control4',
      model: 'Nu-SPACARE',
      productName: '5 Year Warranty',
      productType: 'Service',
      qty: 1,
      unitPrice: 299.00,
      discount: 0,
      total: 299.00,
      taxRate: 'GST',
      category: 'Mechanical Room',
      subcategory: 'Automation',
      option: 'optionalAcc'
    },
    {
      id: 4,
      sku: 88021117,
      brand: 'Sumsung',
      model: 'SM-UN55EH6300',
      productName: '55" Smart LED TV',
      productType: 'Video',
      qty: 1,
      unitPrice: 1299.00,
      discount: 0,
      total: 1299,
      taxRate: 'GST',
      category: 'Living Room',
      subcategory: 'Video'
    },
    {
      id: 5,
      sku: 88020000,
      parentId: 4,
      brand: 'Nu Automationi',
      model: 'Nu-SPA',
      productName: 'SPA Installation',
      productType: 'Service',
      qty: 1,
      unitPrice: 99.00,
      discount: 0,
      total: 396.00,
      taxRate: 'GST',
      category: 'Living Room',
      subcategory: 'Video',
      option: 'automaticAcc'
    },
    {
      id: 6,
      sku: 88021120,
      parentId: 4,
      brand: 'Panasonic',
      model: 'PN-LC55JB9300',
      productName: '55" Smart 4K TV',
      productType: 'Video',
      qty: 1,
      unitPrice: 1399.00,
      discount: 0,
      total: 1399.00,
      taxRate: 'GST',
      category: 'Living Room',
      subcategory: 'Video',
      option: 'alter'
    },
    {
      id: 7,
      sku: 88021117,
      brand: 'Sumsung',
      model: 'SM-UN55EH6300',
      productName: '55" Smart LED TV',
      productType: 'Video',
      qty: 1,
      unitPrice: 1299.00,
      discount: 0,
      total: 1299,
      taxRate: 'GST',
      category: 'Familiy Room',
      subcategory: 'Video'
    },
    {
      id: 8,
      sku: 88020000,
      parentId: 7,
      brand: 'Nu Automationi',
      model: 'Nu-SPA',
      productName: 'SPA Installation',
      productType: 'Service',
      qty: 1,
      unitPrice: 99.00,
      discount: 0,
      total: 396.00,
      taxRate: 'GST',
      category: 'Familiy Room',
      subcategory: 'Video',
      option: 'automaticAcc'
    },
    {
      id: 9,
      sku: 88021120,
      parentId: 7,
      brand: 'Panasonic',
      model: 'PN-LC55JB9300',
      productName: '55" Smart 4K TV',
      productType: 'Video',
      qty: 1,
      unitPrice: 1399.00,
      discount: 0,
      total: 1399.00,
      taxRate: 'GST',
      category: 'Familiy Room',
      subcategory: 'Video',
      option: 'alter'
    },
    {
      id: 10,
      sku: 88021133,
      brand: 'Nuance',
      model: 'NA-RACK42',
      productName: '42 Space full space stanind rack',
      productType: 'Equipment',
      qty: 1,
      unitPrice: 999.00,
      discount: 0,
      total: 1989,
      taxRate: 'GST',
      category: 'Mechanical Room',
      subcategory: 'Equipment'
    },
    {
      id: 11,
      sku: 88020000,
      parentId: 10,
      brand: 'Nu-Automations',
      model: 'Nu-SPA',
      productName: 'SPA Team Installation',
      productType: 'Service',
      qty: 10,
      unitPrice: 99.00,
      discount: 0,
      total: 990,
      taxRate: 'GST',
      category: 'Mechanical Room',
      subcategory: 'Mechanical Room',
      option: 'automaticAcc'
    },
  ];

  public productsInfoAll: Array<object> = [
    {
      imgUrl: 'assets/images/credit-card.png',
      sku: 88022220,
      brand: 'Control4',
      model: 'C4-HC800',
      productName: 'Home Controller 800',
      productType: 'Controller',
      qty: 1,
      unitPrice: 1799.00,
      discount: 0,
      total: 2400.50,
      taxRate: 'GST',
      option: 'Automatic'
    },
    {
      imgUrl: 'assets/images/credit-card.png',
      sku: 88022221,
      brand: 'Sumsung',
      model: 'SM-UN55EH6300',
      productName: '55" Smart LED TV',
      productType: 'Video',
      qty: 4,
      unitPrice: 1299.00,
      discount: 0,
      total: 5592.00,
      taxRate: 'GST',
      option: 'Automatic'
    },
    {
      imgUrl: 'assets/images/credit-card.png',
      sku: 88022222,
      brand: 'Control4',
      model: 'C4-HC800',
      productName: 'Control4 System Remote Controller',
      productType: 'Video',
      qty: 4,
      unitPrice: 199.00,
      discount: 0,
      total: 994.00,
      taxRate: 'GST',
      option: 'Automatic'
    },
    {
      imgUrl: 'assets/images/credit-card.png',
      sku: 88022223,
      brand: 'Niles',
      model: 'NL-6.5INCSPK',
      productName: 'In-ceiling 6.5" Round Speakers',
      productType: 'Audio',
      qty: 8,
      unitPrice: 199.00,
      discount: 0,
      total: 1592.00,
      taxRate: 'GST',
      option: 'Automatic'
    },
    {
      imgUrl: 'assets/images/credit-card.png',
      sku: 88022224,
      brand: 'Control4',
      model: 'C4-AMP8',
      productName: '8 Zone Switchable Matrix',
      productType: 'Audio',
      qty: 1,
      unitPrice: 2499.00,
      discount: 0,
      total: 3093.00,
      taxRate: 'GST',
      option: 'Optional'
    },
    {
      imgUrl: 'assets/images/credit-card.png',
      sku: 88022225,
      brand: 'Nuance',
      model: 'NA-RACK42',
      productName: '42 Space full space stanind rack',
      productType: 'Equipment',
      qty: 1,
      unitPrice: 999.00,
      discount: 0,
      total: 1999.00,
      taxRate: 'GST',
      option: 'Automatic'
    },
    {
      imgUrl: 'assets/images/credit-card.png',
      sku: 88022226,
      brand: 'Key Digital',
      model: 'KD-8x8MAT',
      productName: '8x8 Video Matrix',
      productType: 'Video',
      qty: 2,
      unitPrice: 2999.00,
      discount: 0,
      total: 7405.38,
      taxRate: 'GST',
      option: 'Optional'
    },
    {
      imgUrl: 'assets/images/credit-card.png',
      sku: 88022227,
      brand: 'Control4',
      model: 'C4-HC800',
      productName: 'Home Controller 800',
      productType: 'Controller',
      qty: 1,
      unitPrice: 1799.00,
      discount: 0,
      total: 2400.50,
      taxRate: 'GST',
      option: 'Automatic'
    },
    {
      imgUrl: 'assets/images/credit-card.png',
      sku: 88022228,
      brand: 'Sumsung',
      model: 'SM-UN55EH6300',
      productName: '55" Smart LED TV',
      productType: 'Video',
      qty: 4,
      unitPrice: 1299.00,
      discount: 0,
      total: 5592.00,
      taxRate: 'GST',
      option: 'Optional'
    },
    {
      imgUrl: 'assets/images/credit-card.png',
      sku: 88022229,
      brand: 'Control4',
      model: 'C4-HC800',
      productName: 'Control4 System Remote Controller',
      productType: 'Video',
      qty: 4,
      unitPrice: 199.00,
      discount: 0,
      total: 994.00,
      taxRate: 'GST',
      option: 'Optional'
    },
    {
      imgUrl: 'assets/images/credit-card.png',
      sku: 88022230,
      brand: 'Niles',
      model: 'NL-6.5INCSPK',
      productName: 'In-ceiling 6.5" Round Speakers',
      productType: 'Audio',
      qty: 8,
      unitPrice: 199.00,
      discount: 0,
      total: 1592.00,
      taxRate: 'GST',
      option: 'Optional'
    },
    {
      imgUrl: 'assets/images/credit-card.png',
      sku: 88022231,
      brand: 'Control4',
      model: 'C4-AMP8',
      productName: '8 Zone Switchable Matrix',
      productType: 'Audio',
      qty: 1,
      unitPrice: 2499.00,
      discount: 0,
      total: 3093.00,
      taxRate: 'GST',
      option: 'Optional'
    },
    {
      imgUrl: 'assets/images/credit-card.png',
      sku: 88022232,
      brand: 'Nuance',
      model: 'NA-RACK42',
      productName: '42 Space full space stanind rack',
      productType: 'Equipment',
      qty: 1,
      unitPrice: 999.00,
      discount: 0,
      total: 1999.00,
      taxRate: 'GST',
      option: 'Automatic'
    },
    {
      imgUrl: 'assets/images/credit-card.png',
      sku: 88022233,
      brand: 'Key Digital',
      model: 'KD-8x8MAT',
      productName: '8x8 Video Matrix',
      productType: 'Video',
      qty: 2,
      unitPrice: 2999.00,
      discount: 0,
      total: 7405.38,
      taxRate: 'GST',
      option: 'Optional'
    },
  ];

  public projectCategory = [
    'Living Room', 'Mechanical Room', 'Multi Category', 'Familiy Room'
  ];

  public projectSubCategory = [
    'Lighting System', 'Equipment', 'Automation', 'Video'
  ];

  public projectDetails = {
    discount: {
      amount: 0,
      type: ['$']
    },
    projectId: '',
    projectCategoriesAll: ['Living room', 'Kitchen', 'Master Bedroom', 'Master Bathroom', 'Familiy Room', 'Garage'],
    projectSubCategoriesAll: ['Lighting System', 'Automation System', 'Networking System', 'Equipment'],
    completionDate: 'February 12, 2018',
    paymentSchedule: [50, 30],
    collaborators: [
      {
      imageUrl: 'assets/users/user1.png',
      Sepher: 'crm/contacts/Sepher',
      name: 'Michael'
      }
    ],
    accountManager: [
      {
      imageUrl: 'assets/users/user2.png',
      profileLink: 'crm/contacts/michael',
      name: 'Michael'
      }
    ],
    projectManager: [
      {
      imageUrl: 'assets/users/user3.png',
      profileLink: 'crm/contacts/Nick',
      name: 'Nick'
      }
    ],
    designer: [
      {
      imageUrl: 'assets/users/user1.png',
      profileLink: 'crm/contacts/michael',
      name: 'Michael'
      }
    ]
  };

  ngOnInit() {
    this.proposalService.getUpdatedProposalProductList.subscribe(
      data => {
        if (data[0]) {
          this.proposalProductList = data;
        }
      }
    );
    this.proposalProductListBackup = this.proposalProductList;
  }

  Submit_Inventory_Data(event) {
  }
  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  expandAll(input) {
    this.proposalService.expandAll(true);

    this.proposalProductList = this.proposalProductListBackup;
    this.proposalProductList = this.filterTxt(this.proposalProductList, input);
  }

  getUpdatedDate(data) {
    this.proposalInfo['createdDate'] = data.updated;
  }

  getUpdatedCategories (data) {
    this.projectCategory = data;
  }

  getUpdatedSubCategories (data) {
    this.projectSubCategory = data;
  }

  getMassEditedList(data) {
    console.log('44444', data);
    this.proposalProductList = data;
    this.proposalService.massEditedList(this.proposalProductList);
  }

  filterTxt (arr, searchKey) {
    return arr.filter(function(obj){
      return Object.keys(obj).some(function(key) {
        return obj[key].toString().includes(searchKey);
      });
    });
  }
}

