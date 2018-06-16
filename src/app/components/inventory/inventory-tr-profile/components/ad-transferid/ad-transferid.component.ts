import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ad-transferid',
  templateUrl: './ad-transferid.component.html',
  styleUrls: ['./ad-transferid.component.css']
})
export class TRTransferIdFieldComponent {
  @Input() tr_id;
}
