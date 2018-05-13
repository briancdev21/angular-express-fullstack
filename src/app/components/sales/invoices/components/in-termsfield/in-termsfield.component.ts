import {Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-in-termsfield',
  templateUrl: './in-termsfield.component.html',
  styleUrls: ['./in-termsfield.component.css']
})
export class InTermSelectorComponent implements OnInit {

  @Input() terms;
  @Input() selectedTerm;
  @Output() changedTerm: EventEmitter<any> = new EventEmitter();
  terms_local = [];

  ngOnInit() {
    console.log(this.terms);
    if (this.terms) {
      this.terms_local = this.terms;
    }
  }

  onChangeTerm(event) {
    this.changedTerm.emit(event);
  }

}
