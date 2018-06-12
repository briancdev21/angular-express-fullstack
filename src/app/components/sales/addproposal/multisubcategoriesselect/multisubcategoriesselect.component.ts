import { Component, Input, ViewChild, ElementRef, AfterViewInit, Renderer, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-multisubcategoriesselect',
  templateUrl: './multisubcategoriesselect.component.html',
  styleUrls: [
    './multisubcategoriesselect.component.css'
  ]
})

export class MultiSubCategoriesSelectComponent implements AfterViewInit, OnInit {
  @Input() subCategories;
  @ViewChild('box') input: ElementRef;
  @Input() placeholder;
  @Input() categoryId;
  @Output() sendSubCategories: EventEmitter<any> = new EventEmitter;
  editable: boolean;
  newSubCategory: string;
  subCategoriesNameList = [];
  subCategoriesList = [];

  constructor(private renderer: Renderer, private sharedService: SharedService) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
    const arr = [];
    this.editable = false;
    this.sharedService.getSubCategories(this.categoryId).subscribe(data => {
      this.subCategoriesList = data.results;
      this.subCategoriesNameList = data.results.map(k => k.name);
      // Change subCategories ids to objects
      this.subCategories.forEach(element => {
        for (let i = 0; i < this.subCategoriesList.length; i ++) {
          if (element === this.subCategoriesList[i].id) {
            arr.push(this.subCategoriesList[i]);
          }
        }
      });
      this.subCategories = arr;
    });
  }

  ngAfterViewInit() {
    // this.input.nativeElement.focus();
  }

  addNewSubCategory(data) {
    this.newSubCategory = '';
    if (!this.subCategoriesNameList.includes(data)) {
      this.sharedService.createSubCategory(this.categoryId, {'name': data})
      .subscribe((res) => {
        this.subCategories.push(res.data);
        this.sendSubCategories.emit(this.subCategories);
      });
    } else {
      const pos = this.subCategoriesNameList.indexOf(data);
      this.subCategories.push(this.subCategoriesList[pos]);
      this.sendSubCategories.emit(this.subCategories);
    }
  }

  deleteSubCategory(id) {
    this.sharedService.deleteIndividualSubCategory(this.categoryId, id)
    .subscribe(res => {
      this.sharedService.getSubCategories(this.categoryId).subscribe(data => {
        this.subCategories = data.results;
      });
    });
  }

}
