import { Component, Input, OnInit, HostListener, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
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


export class LoginComponent implements OnInit, OnDestroy {
  loginform: FormGroup;

  temperature = 23;
  weatherLocation = 'Calgary';
  currentTime = '';
  userName = '';
  password = '';
  loginBackground = '';
  timeConvention = '';
  remembered = false;
  currentHour = '';
  currentMin = '';
  interval: any;
  backgroundImages = [
    'assets/Landscapes/Mountains.jpg',
    'assets/Landscapes/asia-750x500.jpg',
    'assets/Landscapes/Downtown_Calgary.jpg',
    'assets/Landscapes/Forest.jpg',
  ];

  constructor (private formBuilder: FormBuilder, private authService: AuthService, private router: Router ) {

  }

  ngOnInit() {
    let backgroundIndex = 0;
    this.loginBackground = 'url(' + this.backgroundImages[backgroundIndex] + ')';
    let newDate = new Date();
    this.currentHour = moment(newDate).format('hh:mm A').slice(0, 2);
    this.currentMin = moment(newDate).format('hh:mm A').slice(3, 5);
    this.timeConvention = moment(newDate).format('hh:mm A').slice(-2);
    this.interval = setInterval(() => {
      newDate = new Date();
      this.currentHour = moment(newDate).format('hh:mm A').slice(0, 2);
      this.currentMin = moment(newDate).format('hh:mm A').slice(3, 5);
      this.timeConvention = moment(newDate).format('hh:mm A').slice(-2);
      if (this.currentHour === '00' && this.currentMin === '00' && this.timeConvention === 'AM') {
        backgroundIndex ++;
      }
    }, 1000);
    this.loginform = this.formBuilder.group({
      password: [null, Validators.required],
      userName: [null, Validators.required]
    });
  }

  onLogin() {
    this.router.navigate(['../home/']);
    // this.authService.login();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  toForgotPassword() {
    this.router.navigate(['../forgot-password/']);
  }

  moveToSignup() {
    this.router.navigate(['../sign-up/']);
  }

}
