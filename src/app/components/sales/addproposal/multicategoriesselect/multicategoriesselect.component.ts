import { Component, Input, ViewChild, ElementRef, AfterViewInit, Renderer, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SharedService } from '../../../../services/shared.service';
import { SalesService } from '../../sales.service';

@Component({
  selector: 'app-multicategoriesselect',
  templateUrl: './multicategoriesselect.component.html',
  styleUrls: [
    './multicategoriesselect.component.css'
  ]
})

export class MultiCategoriesSelectComponent implements AfterViewInit, OnInit {
  @Input() categories;
  @ViewChild('box') input: ElementRef;
  @Input() placeholder;
  @Output() sendCategories: EventEmitter<any> = new EventEmitter;
  editable: boolean;
  newCategory: string;
  categoriesNameList = [];
  categoriesList = [];

  constructor(private renderer: Renderer, private sharedService: SharedService, private salesService: SalesService) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
    console.log('after create categories list:', this.categories);
  }

  ngOnInit() {
    const arr = [];
    this.editable = false;
    this.sharedService.getCategories().subscribe(data => {
      this.categoriesList = data.results;
      this.categoriesNameList = data.results.map(k => k.name);
      // Change categories ids to objects
      this.categories.forEach(element => {
        for (let i = 0; i < this.categoriesList.length; i ++) {
          if (element === this.categoriesList[i].id) {
            arr.push(this.categoriesList[i]);
          }
        }
      });
      this.categories = arr;
    });
  }

  ngAfterViewInit() {
    // this.input.nativeElement.focus();
    this.categoriesNameList = this.categories;
    this.categoriesList = this.categories;
    console.log('categories:', this.categories);
  }

  addNewCategory(data) {
    this.newCategory = '';
    if (!this.categoriesNameList.includes(data)) {
      this.sharedService.createCategory({'name': data})
      .subscribe((res) => {
        this.categories.push(res.data);
        this.sendCategories.emit(this.categories);
        this.salesService.selectedCategory.next(res.data.id);
      });
    } else {
      const pos = this.categoriesNameList.indexOf(data);
      this.categories.push(this.categoriesList[pos]);
      this.sendCategories.emit(this.categories);
      this.salesService.selectedCategory.next(this.categoriesList[pos].id);
    }
  }

  deleteCategory(id) {
    this.sharedService.deleteIndividualCategory(id)
    .subscribe(res => {
      this.sharedService.getCategories().subscribe(data => {
        this.categories = data.results;
      });
      this.salesService.deletedCategory.next(res.data.id);
    });
    console.log('categories list:', this.categories, this.sendCategories);
  }

}
