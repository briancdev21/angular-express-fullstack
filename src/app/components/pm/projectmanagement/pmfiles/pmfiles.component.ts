import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmService } from '../pm.service';

@Component({
  selector: 'app-pmfiles',
  templateUrl: './pmfiles.component.html',
  styleUrls: [
    './pmfiles.component.css',
  ]
})

export class PmFilesComponent implements OnInit {

  constructor( private pmService: PmService ) {
  }

  ngOnInit() {

  }

}
