import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-in-termsfield',
  templateUrl: './in-termsfield.component.html',
  styleUrls: ['./in-termsfield.component.css']
})
export class InTermSelectorComponent implements OnInit {

  @Input() terms;
  @Input() selectedTerm;
  terms_local = [];

  ngOnInit() {
    console.log(this.terms);
    if (this.terms) {
      this.terms_local = this.terms;
    }
  }

}
