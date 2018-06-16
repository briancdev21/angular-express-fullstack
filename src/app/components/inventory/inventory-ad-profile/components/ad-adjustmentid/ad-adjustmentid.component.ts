import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ad-adjustmentid',
  templateUrl: './ad-adjustmentid.component.html',
  styleUrls: ['./ad-adjustmentid.component.css']
})
export class ADAdjustmentIdFieldComponent {
  @Input() ad_id;
}
