import { Component, Input, ViewChild, ElementRef, AfterViewInit, Renderer, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SharedService } from '../../../../../services/shared.service';

@Component({
  selector: 'app-multivariantsselect',
  templateUrl: './multivariantsselect.component.html',
  styleUrls: [
    './multivariantsselect.component.css'
  ]
})

export class MultiVariantsSelectComponent implements AfterViewInit, OnInit {
  @Input() keywords;
  @ViewChild('box') input: ElementRef;
  @Input() placeholder;
  @Output() sendKeywords: EventEmitter<any> = new EventEmitter;
  editable: boolean;
  newKeyword: string;
  keywordsNameList = [];
  keywordsList = [];

  constructor(private renderer: Renderer) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
    const arr = [];
    this.editable = false;
    if (this.keywords) {
      this.keywords.forEach(element => {
        for (let i = 0; i < this.keywordsList.length; i ++) {
          if (element === this.keywordsList[i].id) {
            arr.push(this.keywordsList[i]);
          }
        }
      });
    }

    this.keywords = arr;
  }

  ngAfterViewInit() {
    // this.input.nativeElement.focus();
  }

  addNewKeyword(data) {
    this.newKeyword = '';
    if (!this.keywords.includes(data)) {
      this.keywords.push(data);
      this.sendKeywords.emit(this.keywords);
    }
  }

  deleteKeyword(data) {
    const pos = this.keywords.indexOf(data);
    this.keywords.splice(pos, 1);
    this.sendKeywords.emit(this.keywords);
  }

}
