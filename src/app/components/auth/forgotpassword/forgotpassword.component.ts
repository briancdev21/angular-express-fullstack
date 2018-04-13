import { Component, Input, OnInit, HostListener, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthService } from '../auth.service';
import { Ng2CompleterComponent } from '../../common/ng2completer/ng2completer.component';
import * as moment from 'moment';
import { FormControl, Validators, NgForm, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: [
    './forgotpassword.component.css',
  ],
  providers: [AuthService]
})


export class ForgotPasswordComponent implements OnInit {

  registerForm: FormGroup;
  registerFormErrors: any;
  loginBackground = '';
  currentHour = '';
  currentMin = '';
  currentTime = '';
  timeConvention = '';
  interval: any;
  backgroundImages = [
    'assets/Landscapes/Mountains.jpg',
    'assets/Landscapes/asia-750x500.jpg',
    'assets/Landscapes/Downtown_Calgary.jpg',
    'assets/Landscapes/Forest.jpg',
  ];
  constructor(
      private formBuilder: FormBuilder
  ) {
    this.registerFormErrors = {
      name           : {},
      email          : {},
      password       : {},
      passwordConfirm: {}
    };
  }

  ngOnInit() {
    let backgroundIndex = 0;
    this.loginBackground = 'url(' + this.backgroundImages[backgroundIndex] + ')';
    this.interval = setInterval(() => {
      const newDate = new Date();
      this.currentHour = moment(newDate).format('hh:mm A').slice(0, 2);
      this.currentMin = moment(newDate).format('hh:mm A').slice(3, 5);
      this.timeConvention = moment(newDate).format('hh:mm A').slice(-2);
      if (this.currentHour === '00' && this.currentMin === '00' && this.timeConvention === 'AM') {
        backgroundIndex ++;
      }
    }, 1000);
    this.registerForm = this.formBuilder.group({
        email          : ['', [Validators.required, Validators.email]],
    });

    this.registerForm.valueChanges.subscribe(() => {
        this.onRegisterFormValuesChanged();
    });
  }

  onRegisterFormValuesChanged()
  {
      for ( const field in this.registerFormErrors )
      {
          if ( !this.registerFormErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.registerFormErrors[field] = {};

          // Get the control
          const control = this.registerForm.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.registerFormErrors[field] = control.errors;
          }
      }
  }

}
