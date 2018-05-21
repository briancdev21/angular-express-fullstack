import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PendingProjectService } from '../pendingproject.service';
import { PmTasksData, TaskModel, SubTaskModel } from '../../../../../models/pmtasksdata.model';
import * as moment from 'moment';

@Component({
  selector: 'app-pendingprojecttasks',
  templateUrl: './pendingprojecttasks.component.html',
  styleUrls: [
    './pendingprojecttasks.component.css',
  ]
})

export class PendingProjectTasksComponent implements OnInit {
  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;

  addDocumentModalCollapsed = true;
  addTemplateModalCollapsed = true;
  invalidDocumentName = false;
  invalidTemplate = false;
  invalidStartDate = false;
  selectTemplate = '';
  addDocument = {
    documentName: '',
    lastUpdated: '',
    approvedDate: '',
    collaborator: ''
  };
  addTemplate = {
    templateName: '',
    startDate: ''
  };

  collaboratorList = ['John Moss', 'Latif', 'Dennis'];
  templateList = ['template 1', 'template 2', 'template 3'];
  tabActiveFirst = true;
  selectcollaborator: any;

  constructor(private router: Router) {

  }
  ngOnInit() {

  }

  selectLastUpdated(event) {
    this.addDocument.lastUpdated = moment(event.value).format('YYYY-MM-DD');
    console.log('last: ', this.addDocument.lastUpdated);
  }

  selectApprovedDate(event) {
    this.addDocument.approvedDate = moment(event.value).format('YYYY-MM-DD');
  }

  onSelectcollaborator(event) {
    this.addDocument.collaborator = event;
  }

  cancelAddDocument() {
    this.addDocumentModalCollapsed = true;
  }

  saveAddDocument() {
    this.invalidDocumentName = false;
    if (this.addDocument.documentName) {
      this.addDocumentModalCollapsed = true;
      this.addDocument.documentName = '';
    } else {
      this.invalidDocumentName = true;
    }
  }

  onSelectTemplate(event) {
    this.addTemplate.templateName = event;
  }

  selectStartDate(event) {
    this.addTemplate.startDate = moment(event.value).format('YYYY-MM-DD');
  }

  cancelAddTemplate() {
    this.addTemplateModalCollapsed = true;
  }

  saveAddTemplate() {
    this.invalidStartDate = false;
    this.invalidTemplate = false;
    if (this.addTemplate.startDate && this.addTemplate.templateName) {
      this.addTemplateModalCollapsed = true;
      this.addTemplate.startDate = this.addTemplate.templateName = '';
    } else {
      if (!this.addTemplate.startDate) {
        this.invalidStartDate = true;
      }
      if (!this.addTemplate.templateName) {
        this.invalidTemplate = true;
      }
    }
  }

  toProjectScope() {
    this.router.navigate(['./pm/pending-project/pending-scope']);
  }

  toProjectFinancials() {
    this.router.navigate(['./pm/pending-project/pending-financials']);
  }
}
