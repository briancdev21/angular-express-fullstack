import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-po-termsfield',
  templateUrl: './po-termsfield.component.html',
  styleUrls: ['./po-termsfield.component.css']
})
export class POTermSelectorComponent implements OnInit {

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
