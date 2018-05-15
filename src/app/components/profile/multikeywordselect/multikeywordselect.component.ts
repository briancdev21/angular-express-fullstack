import { Component, Input, ViewChild, ElementRef, AfterViewInit, Renderer, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-multikeywordselect',
  templateUrl: './multikeywordselect.component.html',
  styleUrls: [
    './multikeywordselect.component.css'
  ]
})

export class MultiKeywordSelectComponent implements AfterViewInit, OnInit {
  @Input() keywords;
  @ViewChild('box') input: ElementRef;
  @Input() placeholder;
  @Output() sendKeywords: EventEmitter<any> = new EventEmitter;
  editable: boolean;
  newKeyword: string;
  keywordsNameList = [];
  keywordsList = [];

  constructor(private renderer: Renderer, private sharedService: SharedService) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
    const arr = [];
    this.editable = false;
    this.sharedService.getKeywords().subscribe(data => {
      this.keywordsList = data.results;
      this.keywordsNameList = data.results.map(k => k.name);
      // Change keywords ids to objects
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
    });
  }

  ngAfterViewInit() {
    // this.input.nativeElement.focus();
  }

  addNewKeyword(data) {
    this.newKeyword = '';
    if (!this.keywordsNameList.includes(data)) {
      this.sharedService.createKeyword({'name': data})
      .subscribe((res) => {
        this.keywords.push(res.data);
        this.sendKeywords.emit(this.keywords);
      });
    } else {
      const pos = this.keywordsNameList.indexOf(data);
      this.keywords.push(this.keywordsList[pos]);
      this.sendKeywords.emit(this.keywords);
    }
  }

  deleteKeyword(id) {
    this.sharedService.deleteKeyword(id)
    .subscribe(res => {
      this.sharedService.getKeywords().subscribe(data => {
        this.keywords = data.results;
      });
    });
  }

}
