import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-ynmodal',
  templateUrl: './ynmodal.component.html',
  styleUrls: [
    './ynmodal.component.css'
  ]
})
export class YnModalComponent implements OnInit {

  @Input() modalContent;
  @Output() confirmClicked: EventEmitter<any> = new EventEmitter;
  showYnModal = false;

  constructor( private sharedService: SharedService, private commonService: CommonService ) {
    this.commonService.showYnModal.subscribe(data => {
      console.log('showmodal: ', data);
      if (data) {
        this.showYnModal = true;
        console.log('showmodal: ', data);
      }
    });
  }

  ngOnInit() {

  }

  openOwnerModal() {
  }

  onClickYes() {
    this.showYnModal = false;
    this.confirmClicked.emit({data: true});
  }

  onClickNo() {
    this.showYnModal = false;
    this.confirmClicked.emit({data: false});
  }

}
