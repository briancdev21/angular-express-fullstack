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
  @Input() subCategories;
  @ViewChild('box') input: ElementRef;
  @Input() placeholder;
  @Output() sendSubCategories: EventEmitter<any> = new EventEmitter;
  editable: boolean;
  newSubCategory: string;
  subCategoriesNameList = [];
  subCategoriesList = [];
  categoryId: any;
  categoriesList = [];

  constructor(private renderer: Renderer, private sharedService: SharedService, private salesService: SalesService) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });

    this.salesService.selectedCategory.subscribe(res => {
      console.log('receive cate: ', res);
      this.categoriesList.push(res);
      this.categoryId = res;
      this.sharedService.getSubCategories(this.categoryId).subscribe(data => {
        this.subCategoriesList = data.results;
        this.subCategoriesNameList = data.results.map(r => r.name);
      });
    });

    this.salesService.deletedCategory.subscribe(res => {
      console.log('deleted cate: ', res);
      this.subCategories = [];
      const pos = this.categoriesList.indexOf(res);
      this.categoriesList.splice(pos, -1);
      this.categoriesList.forEach(ele => {
        this.sharedService.getSubCategories(ele).subscribe(data => {

          this.subCategories.concat(data.results);
        });
      });
    });
  }

  ngOnInit() {
    const arr = [];
    this.editable = false;
    // if (this.categoryId) {
    //   this.sharedService.getSubCategories(this.categoryId).subscribe(data => {
    //     this.subCategoriesList = data.results;
    //     this.subCategoriesNameList = data.results.map(k => k.name);
    //     // Change subCategories ids to objects
    //     // this.subCategories.forEach(element => {
    //     //   for (let i = 0; i < this.subCategoriesList.length; i ++) {
    //     //     if (element === this.subCategoriesList[i].id) {
    //     //       arr.push(this.subCategoriesList[i]);
    //     //     }
    //     //   }
    //     // });
    //     this.subCategories = arr;
    //   });
    // }
  }

  ngAfterViewInit() {
    // this.input.nativeElement.focus();
  }

  checkInSub(data) {

    if (this.subCategoriesNameList.includes(data)) {
      return true;
    } else {
      return false;
    }

  }

  addNewSubCategory(data) {
    this.newSubCategory = '';
    if (this.checkInSub(data)) {
      const pos = this.subCategoriesNameList.indexOf(data);
      this.subCategories.push(this.subCategoriesList[pos]);
      this.sendSubCategories.emit(this.subCategories);
      console.log('sub pos:', pos, this.subCategories);

    } else {
      this.sharedService.createSubCategory(this.categoryId, {'name': data})
      .subscribe((res) => {
        this.subCategories.push(res.data);
        this.sendSubCategories.emit(this.subCategories);
      });
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
