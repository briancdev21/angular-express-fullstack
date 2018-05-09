import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmService } from '../../pm.service';

@Component({
  selector: 'app-changelogprofile',
  templateUrl: './changelogprofile.component.html',
  styleUrls: [
    './changelogprofile.component.css',
  ]
})

export class ChangeLogProfileComponent implements OnInit {
  @Input() changeLogList;
  @Input() changeLogInfo;

  changeLogStatus = 'inProgress';
  showConfirmModal = false;

  constructor( private pmService: PmService, private router: Router ) {
  }

  ngOnInit() {

  }

  confirm() {
    this.router.navigate(['../estimate']);
  }

}
