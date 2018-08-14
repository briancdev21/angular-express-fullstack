import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../../components/common/common.component';
import { SubmenuComponent } from '../../submenu/submenu.component';
import { ProposalService } from './proposal.service';
import { Router , ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { ProposalsService } from '../../../services/proposals.service';
import * as moment from 'moment';

@Component({
  selector: 'app-test',
  templateUrl: './proposal.component.html',
  styleUrls: [
    './proposal.component.css'
  ]
})
export class ProposalComponent implements OnInit {


  menuCollapsed = true;
  proposalId: any;
  public searchQueryString = '';
  proposalProductListBackup = [];
  contactsList = [];
  productTypesList = [];
  proposalDetails = {};
  categoryDetails = [];
  subCategoryDetails = [];
  userList = [];

  public proposalInfo: any = {
  };

  public productType = [
    'Controller', 'Video', 'Audio', 'Equipment'
  ];

  public proposalCategoryList = [];

  public proposalSubCategoryList = [];

  public proposalProductList: Array<object> = [
  ];

  public productsInfoAll: Array<object> = [
  ];

  public projectCategory = [];

  public projectSubCategory = [];

  public projectDetails: any;

  constructor( private proposalService: ProposalService, private route: ActivatedRoute, private sharedService: SharedService,
    private proposalsService: ProposalsService, private router: Router ) {
    this.proposalId = this.route.snapshot.paramMap.get('id');
    this.sharedService.getProjectTypes().subscribe(res => {
      this.productTypesList = res;
    });
    this.sharedService.getUsers().subscribe(res => {
      this.userList = res;
    });

    this.getProposalData();
  }

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

  redirectToProposals() {
    this.router.navigate(['../sales/proposals']);
  }

  getProposalData() {
    this.sharedService.getContacts().subscribe(data => {
      data = this.addContactName(data);
      this.contactsList = data;
      this.proposalsService.getIndividualProposal(this.proposalId).subscribe(res => {
        console.log('proposals service: ', res);
        // this.getCategoryDetails(res.data.categoryIds);
        // this.getSubCategoryDetails(res.data.subcategoryIds);
        this.proposalDetails = res.data;
        this.proposalInfo = {
          proposalId : res.data.id,
          contactName : this.getContactNameFromId(res.data.contactId),
          projectName: res.data.name,
          proposalAmount: res.data.total,
          projectId: res.data.projectId,
          dealStatus: res.data.status,
          revision: res.data.revision,
          createdDate: moment(res.data.updatedAt).format('MMMM DD, YYYY'),
        };
      });
    });
  }
  Submit_Inventory_Data(event) {
  }
  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  expandAll(input) {
    this.proposalService.expandAll(true);

    // this.proposalProductList = this.proposalProductListBackup;
    // this.proposalProductList = this.filterTxt(this.proposalProductList, input);
    this.proposalService.searchQueryProposalProducts.next(input);
  }

  getUpdatedDate(data) {
    // this.proposalInfo['createdDate'] = data.updated;
    if (data) {
      this.getProposalData();
    }
  }

  getUpdatedCategories (data) {
    this.projectCategory = data;
  }

  getUpdatedSubCategories (data) {
    this.projectSubCategory = data;
  }

  getMassEditedList(data) {
    this.proposalProductList = data;
    this.proposalService.massEditedList(this.proposalProductList);
  }

  getContactNameFromId(id) {
    let selectedContact;
    this.sharedService.getMulipleContacts(id).subscribe(res => {
      selectedContact = res[0];
      console.log('44444', id, res);
      if (selectedContact.type === 'PERSON') {
        return selectedContact.person.firstName + ' ' + selectedContact.person.lastName;
      } else {
        return selectedContact.business.name;
      }
    });
  }

  getProductTypeNameFromId(id) {
    const selectedType = this.productTypesList.filter(c => c.id.toString() === id)[0];
    return selectedType.name;
  }

  filterTxt (arr, searchKey) {
    return arr.filter(function(obj){
      return Object.keys(obj).some(function(key) {
        return obj[key].toString().includes(searchKey);
      });
    });
  }

  getCategoryDetails(categoryIds) {
    const categories = [];
    categoryIds.forEach((categoryId, index) => {
      this.sharedService.getIndividualCategory(categoryId).subscribe(data => {
        categories.push(data.data);
        if (index === categoryIds.length - 1) {
          this.categoryDetails = categories;
          this.getSubCategoryDetails(categoryIds);
        }
      });
    });
  }

  getSubCategoryDetails(categoryIds) {
    let subcategories = [];
    categoryIds.forEach((categoryId, index) => {
      this.sharedService.getSubCategories().subscribe(data => {
        subcategories = data.results;
        if (index === categoryIds.length - 1) {
          this.subCategoryDetails = subcategories;
          this.getProjectDetails();
        }
      });
    });
  }

  getColloboratorDetails(collaborators) {
    const details = [];
    const nameList = this.userList.map(contact => contact.username);
    console.log('nameList:', nameList);
    collaborators.forEach((collaborator, index) => {
      if (nameList.indexOf(collaborator) !== -1) {
        details.push(this.userList[index]);
      }
    });
    return details;
  }

  getContactInfo(contactName) {
    const nameList = this.userList.map(contact => contact.username);
      if (nameList.indexOf(contactName) !== -1) {
        return this.userList[nameList.indexOf(contactName)];
      }
  }

  getProjectDetails() {
    // const projectDetails = {
    //   proposalId: this.proposalDetails['id'],
    //   discount: {
    //     amount: this.proposalDetails['discount'].value,
    //     type: this.proposalDetails['discount'].unit === 'AMOUNT' ? ['$'] : ['%']
    //   },
    //   projectId: this.proposalDetails['projectId'],
    //   projectCategoriesAll: this.categoryDetails,
    //   projectSubCategoriesAll: this.subCategoryDetails,
    //   completionDate: this.proposalDetails['completionDate'],
    //   paymentSchedule: this.proposalDetails['paymentSchedule'],
    //   collaborators: this.getColloboratorDetails(this.proposalDetails['collaborators']),
    //   accountManager: this.getContactInfo(this.proposalDetails['accountManager']),
    //   projectManager: this.getContactInfo(this.proposalDetails['projectManager']),
    //   designer: this.getContactInfo(this.proposalDetails['designer']),
    //   internalNote: this.proposalDetails['internalNote'],
    //   clientNote: this.proposalDetails['clientNote'],
    //   projectName: this.proposalDetails['projectName'],
    //   scopeOfWork: this.proposalDetails['scopeOfWork'],
    //   shippingAddress: this.proposalDetails['shippingAddress'],
    //   taxRateId: this.proposalDetails['taxRateId'],
    //   pricingCategoryId: this.proposalDetails['pricingCategoryId'],
    //   projectTypeId: this.proposalDetails['projectTypeId'],
    //   contactId: this.proposalDetails['contactId'],
    //   currencyId:  this.proposalDetails['currencyId'],
    //   leadId:  this.proposalDetails['leadId'],
    //   clientProjectManagerId:  this.proposalDetails['clientProjectManagerId'],
    //   accountReceivableId:  this.proposalDetails['accountReceivableId'],
    //   name:  this.proposalDetails['name'],
    // };
    // // console.log('project details:', projectDetails);
    // this.projectDetails = projectDetails;
  }

  addContactName(data) {
    data.forEach(element => {
      if (element.type === 'PERSON') {
        element.name = element.person.firstName + ' ' + element.person.lastName;
      } else {
        element.name = element.business.name;
      }
    });
    return data;
  }

  getProjectCategories (event) {
    this.projectCategory = event.target.value;
    console.log('categories list:', this.projectCategory);
  }

  getProjectSubCategories (event) {
    this.projectSubCategory = event.target.value;
    console.log('subcategories list:', this.projectSubCategory);
  }
}

