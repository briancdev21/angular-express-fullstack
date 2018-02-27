import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SubnavHandlerService } from '../services/subnav-handler.service';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css']
})
export class SubmenuComponent implements OnInit {
  mRotateMenu: boolean = false;
  private mIconChange: boolean = false;
  private mAssign: boolean = false;
  private mWhichAssigned: string = 'sami';
  private mCurrentdate = new Date();
  private mToday = new Date(this.mCurrentdate.getFullYear(), this.mCurrentdate.getMonth(), this.mCurrentdate.getDate());
  private mDisplaydate;
  private mcalendarIcon: boolean = false;
  @Output() mOutputData = new EventEmitter();

  constructor(private _ser: SubnavHandlerService) { }

  ngOnInit() {
    this._ser.currentvalue.subscribe((menurotate) => this.mRotateMenu = menurotate);
    this._ser.submenudata.subscribe((submenuhandler) => this.mAssign = submenuhandler);
  }

  change_icon(): void {
    this.mIconChange = !this.mIconChange;
  }

  assign_to(): void {
    this.mAssign = !this.mAssign;
    this._ser.topmenuhandler(false);
  }
  datePicker(event: any) {
    const mSelected = event._selected.toString();
    const mSelectedDate = mSelected.split(' ');
    this.mDisplaydate = mSelectedDate[2];
    this.mcalendarIcon = true;
  }
  onSubmit(formval: any): any {
    this.mOutputData.next(formval.value);
    this.mcalendarIcon = false;
  }
  calendarHandler() {
    this.mAssign = false;
  }

}
