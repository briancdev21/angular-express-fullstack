import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-progressprojectbrief',
  templateUrl: './progressprojectbrief.component.html',
  styleUrls: [
    './progressprojectbrief.component.css',
  ]
})

export class ProgressProjectBriefComponent implements OnInit {
  projectScope = {
    workScope: '',
    internalNotes: ''
  };

  constructor( private router: Router) {
  }

  ngOnInit() {

  }

}
