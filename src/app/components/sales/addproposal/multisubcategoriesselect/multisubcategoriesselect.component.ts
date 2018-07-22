import { Component, Input, ViewChild, ElementRef, AfterViewInit, Renderer, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SharedService } from '../../../../services/shared.service';
import { SalesService } from '../../sales.service';

@Component({
  selector: 'app-multisubcategoriesselect',
  templateUrl: './multisubcategoriesselect.component.html',
  styleUrls: [
    './multisubcategoriesselect.component.css'
  ]
})

export class MultiSubCategoriesSelectComponent implements AfterViewInit, OnInit {
  @Input() set subCategories(val) {
    this._subCategories = val;
    const arr = [];
    this.editable = false;
    this.sharedService.getSubCategories().subscribe(data => {
      this.subCategoriesList = data.results;
      this.subCategoriesNameList = data.results.map(k => k.name);
      // Change categories ids to objects
      this._subCategories.forEach(element => {
        for (let i = 0; i < this.subCategoriesList.length; i ++) {
          if (element === this.subCategoriesList[i].id) {
            arr.push(this.subCategoriesList[i]);
          }
        }
      });
      this._subCategories = arr;
    });
  }
  @ViewChild('box') input: ElementRef;
  @Input() placeholder;
  @Output() sendSubCategories: EventEmitter<any> = new EventEmitter;
  editable: boolean;
  newSubCategory: string;
  subCategoriesNameList = [];
  subCategoriesList = [];
  _subCategories: any;

  constructor(private renderer: Renderer, private sharedService: SharedService, private salesService: SalesService) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.input.nativeElement.focus();
  }

  addNewSubCategory(data) {
    this.newSubCategory = '';
    if (!this.subCategoriesNameList.includes(data)) {
      this.sharedService.createSubCategory({'name': data})
      .subscribe((res) => {
        this._subCategories.push(res.data);
        this.sendSubCategories.emit(this._subCategories);
      });
    } else {
      const pos = this.subCategoriesNameList.indexOf(data);
      this._subCategories.push(this.subCategoriesList[pos]);
      this.sendSubCategories.emit(this._subCategories);
    }
  }

  deleteSubCategory(id) {
    this.sharedService.deleteIndividualSubCategory(id)
    .subscribe(res => {
      this.sharedService.getSubCategories().subscribe(data => {
        this._subCategories = data.results;
      });
      this.salesService.deletedCategory.next(res.data.id);
    });
    console.log('categories list:', this._subCategories, this.sendSubCategories);
  }

}
