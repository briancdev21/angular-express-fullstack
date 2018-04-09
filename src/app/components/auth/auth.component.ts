import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [
    './auth.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [AuthService]
})
export class AuthComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }
}
