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

  constructor(private renderer: Renderer, private sharedService: SharedService) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
    this.editable = false;
    this.sharedService.getKeywords().subscribe(data => {
      console.log('keywords: ', data);
    });
  }

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

  addNewKeyword(data) {
    this.keywords.push(data);
    this.newKeyword = '';
    this.sendKeywords.emit(this.keywords);
    this.sharedService.createKeyword({'name': data})
    .subscribe((res) => console.log('post data: ', res));
  }

  deleteKeyword(data) {
    this.sharedService.deleteKeyword({'name': data})
    .subscribe((res) => console.log('post data: ', res));
  }

}
