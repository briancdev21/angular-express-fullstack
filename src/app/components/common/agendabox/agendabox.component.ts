import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-agendabox',
  templateUrl: './agendabox.component.html',
  styleUrls: ['./agendabox.component.css']
})
export class AgendaBoxComponent implements OnInit {

@Input() agendaInfo;
  constructor() { }
  ngOnInit() {
  }
}
