import {Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
@Component({
  selector: 'app-in-category',
  templateUrl: './in-category.component.html',
  styleUrls: ['./in-category.component.css']
})
export class InCategoryComponent implements OnInit {

  @Input() set categoryList(_categories: any[]) {
    _categories.forEach((category, index) => {
        this.categories.push({'name': category.name, 'value': category.id});
      });
  }
  @Input() currentCategory;
  @Output() selectedCategory: EventEmitter<any> = new EventEmitter();
  categories = [];

  private searchStr: string;
  dataService: CompleterData;


  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.categories, 'name', 'name');
  }

  ngOnInit() {
  }

  onSelected(item: CompleterItem) {
    if (item) {
      this.selectedCategory.emit(item.originalObject.value);
    }
  }

}
