import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activitiesbox',
  templateUrl: './activitiesbox.component.html',
  styleUrls: ['./activitiesbox.component.css']
})
export class ActivitiesBoxComponent implements OnInit {

@Input() activitiesInfo;
  constructor() { }
  ngOnInit() {
  }
}
