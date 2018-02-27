import { Component, Input, ViewChild, ElementRef, AfterViewInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multikeywordselect',
  templateUrl: './multikeywordselect.component.html',
  styleUrls: [
    './multikeywordselect.component.css'
  ]
})

export class MultiKeywordSelectComponent implements AfterViewInit {
  @Input() keywords;
  @ViewChild('box') input: ElementRef;
  editable: boolean;
  newKeyword: string;

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

}
