import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-in-orderidfield',
  templateUrl: './in-orderidfield.component.html',
  styleUrls: ['./in-orderidfield.component.css']
})
export class InOrderIdFieldComponent {
  @Input() in_id;
  @Input() title;
}
