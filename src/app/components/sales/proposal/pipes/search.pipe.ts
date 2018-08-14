import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'SearchPipe',
})
export class SearchPipe implements PipeTransform {
 transform(value: any, input: string, searchableList: any) {
  if (input) {
   // input = input.toLowerCase();
   return value.filter(function (el: any) {
   let isTrue = false;
   for (const k in searchableList) {
    //  if (el[searchableList[k]].toLowerCase().indexOf(input) > -1){
    //   isTrue = true;
    //  }
      if (el[searchableList[k]].indexOf(input) > -1){
        isTrue = true;
      }
     if (isTrue){
      return el;
     }
    }
  });
 }
 return value;
 }
}
