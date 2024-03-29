import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-po-termsfield',
  templateUrl: './po-termsfield.component.html',
  styleUrls: ['./po-termsfield.component.css']
})
export class POTermSelectorComponent implements OnInit {


  @Input() set terms(_terms: any[]) {
    this.terms_local = _terms;
  }
  @Output() selectedTerm: EventEmitter<any> = new EventEmitter();
  terms_local = [];

  ngOnInit() {
  }
  onchange(event) {
    this.selectedTerm.emit(event.target.value);
  }
}
