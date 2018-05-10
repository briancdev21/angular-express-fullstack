import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PendingProjectService } from '../pendingproject.service';

@Component({
  selector: 'app-pendingprojectscope',
  templateUrl: './pendingprojectscope.component.html',
  styleUrls: [
    './pendingprojectscope.component.css',
  ]
})

export class PendingProjectScopeComponent implements OnInit {
  projectScope = {
    workScope: '',
    internalNotes: ''
  };

  constructor( private router: Router, private pendingProjectService: PendingProjectService ) {
  }

  ngOnInit() {

  }

  toProjectInfo() {
    this.router.navigate(['./pm/pending-project/pending-information']);
  }

  toProjectTasks() {
    this.router.navigate(['./pm/pending-project/pending-tasks']);
  }

}
