import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectManagementService } from '../../../projectmanagement.service';
import * as moment from 'moment';
import { SharedService } from '../../../../../../services/shared.service';
import { ProjectsService } from '../../../../../../services/projects.service';
import { EstimatesService } from '../../../../../../services/estimates.service';

@Component({
  selector: 'app-addchangelogprofile',
  templateUrl: './addchangelogprofile.component.html',
  styleUrls: [
    './addchangelogprofile.component.css',
  ]
})

export class AddChangeLogProfileComponent implements OnInit {

  changeLogList = [
  ];


  changeLogStatus = 'IN_PROGRESS';
  showConfirmModal = false;
  descriptionChange: any;
  detailsChange: any;
  usersList = [];
  currentProjectId: any;
  currentChangeLogId: any;
  title: string;
  changeLogInfo: any;
  createdEstimateId: any;

  constructor( private projectManagementService: ProjectManagementService, private router: Router, private sharedService: SharedService,
    private projectsService: ProjectsService, private route: ActivatedRoute, private estimatesService: EstimatesService ) {
      this.currentProjectId = localStorage.getItem('current_projectId');
      this.currentChangeLogId = this.route.snapshot.paramMap.get('id');

      this.sharedService.getUsers().subscribe(data => {
        this.usersList = data;
        this.addUserRealName(this.usersList);
        // this.projectsService.getIndividualProjectChangeLog(this.currentProjectId, this.currentChangeLogId).subscribe(res => {
        //   this.changeLogInfo = res.results;
        //   this.changeLogInfo.customerName = this.getCustomerNameFromUsername(res.data.contactId);
        //   console.log('indi project: ', this.changeLogInfo);
        // });

      });

      this.projectManagementService.createdChangeLogData.subscribe(data => {
        if (data) {
          this.changeLogInfo = data;
        }
      });
  }

  ngOnInit() {

  }

  confirm() {
    this.router.navigate(['../estimate']);
  }

  addUserRealName(data) {
    data.forEach(element => {
      element.name = element.firstName + ' ' + element.lastName;
    });
    return data;
  }

  getCustomerNameFromUsername(username) {
    const selectedUser = this.usersList.filter(c => c.username === username)[0];
    return selectedUser.name;
  }

  onChangeTitle(event) {
    this.projectManagementService.logTitleChange.next(event);
  }

  onChangeStatus(event) {
    this.projectManagementService.logStatusChange.next(event);
  }

  createEstimate() {
    const savingData = {
      changeLogId: this.changeLogInfo.id,
      shippingAddress: this.changeLogInfo.adress,
      contactId: this.changeLogInfo.contactId
    };
    this.estimatesService.createEstimate(savingData).subscribe(res => {
      console.log('created Estimate: ', res);
      this.createdEstimateId = res.data.id;
      this.router.navigate([`./estimate-profile/${this.createdEstimateId}`]);
    });
  }

}
