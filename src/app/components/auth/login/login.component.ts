import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthService } from '../auth.service';
import { Ng2CompleterComponent } from '../../common/ng2completer/ng2completer.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
  ],
  providers: [AuthService]
})


export class LoginComponent implements OnInit {

  ngOnInit() {

  }

}
