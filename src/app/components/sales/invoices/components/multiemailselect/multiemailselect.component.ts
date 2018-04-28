import { Component, Input, ViewChild, ElementRef, AfterViewInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-multiemailselect',
  templateUrl: './multiemailselect.component.html',
  styleUrls: [
    './multiemailselect.component.css'
  ]
})

export class MultiEmailSelectComponent implements AfterViewInit, OnInit {
  @Input() keywords;
  @ViewChild('box') input: ElementRef;
  @Input() placeholder;
  editable: boolean;
  newKeyword: string;
  addedItem: string;
  invalid = false;

  constructor(private renderer: Renderer) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
    this.editable = false;
  }

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

  checkEmailValidation(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  addNew(value) {
    if (this.checkEmailValidation(value)) {
      this.keywords.push(value);
      this.addedItem = '';
      this.invalid = false;
    } else {
      this.invalid = true;
    }
  }

}
