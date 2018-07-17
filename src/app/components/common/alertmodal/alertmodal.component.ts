import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-alertmodal',
  templateUrl: './alertmodal.component.html',
  styleUrls: [
    './alertmodal.component.css'
  ]
})
export class AlertModalComponent implements OnInit {

  @Input() modalContent;
  showAlertModal = false;

  constructor( private sharedService: SharedService, private commonService: CommonService ) {
    this.commonService.showAlertModal.subscribe(data => {
      if (data) {
        this.showAlertModal = true;
        console.log('showmodal: ', data);
      }
    });
  }

  ngOnInit() {

  }

  openOwnerModal() {
  }

}
