import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthService } from '../auth.service';
import { Ng2CompleterComponent } from '../../common/ng2completer/ng2completer.component';
import * as moment from 'moment';
import { FormControl, Validators, NgForm, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
  ],
  providers: [AuthService]
})


export class LoginComponent implements OnInit {
  loginform: FormGroup;

  temperature = 23;
  weatherLocation = 'Calgary';
  currentTime = '';
  userName = '';
  password = '';
  loginBackground = '';
  timeConvention = '';
  remembered = false;
  backgroundImages = [
    'assets/Landscapes/Mountains.jpg',
    'assets/Landscapes/asia-750x500.jpg',
    'assets/Landscapes/Downtown_Calgary.jpg',
    'assets/Landscapes/Forest.jpg',
  ];

  constructor (private formBuilder: FormBuilder, private authService: AuthService, private router: Router ) {

  }

  ngOnInit() {
    const newDate = new Date();
    this.currentTime = moment(newDate).format('hh:mm A').slice(0, -2);
    this.timeConvention = moment(newDate).format('hh:mm A').slice(-2);
    this.loginBackground = 'url(' + this.backgroundImages[0] + ')';

    this.loginform = this.formBuilder.group({
      password: [null, Validators.required],
      userName: [null, Validators.required]
    });
  }

  onLogin() {
    this.router.navigate(['../home/']);
  }

}
