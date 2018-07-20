import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDateStatus'
})
export class GetDateStatus implements PipeTransform {
  transform(date: string): string {
    const ymd = date.split('-');
    const inputDate = new Date(`${ymd[1]}/${ymd[2]}/${ymd[0]}`);
    const todaysDate = new Date();
    let dateStr;
    // call setHours to take the time out of the comparison
    const dif = (todaysDate.setHours(0, 0, 0, 0) - inputDate.setHours(0, 0, 0, 0)) / 86400 / 1000;

    switch (dif) {
      case 0: {
        dateStr = 'Today';
      } break;
      case 1: {
        dateStr = 'Yesterday';
      } break;
      case 2 : {
        dateStr = 'Two days ago';
      } break;
      case 3 : {
        dateStr = 'Three days ago';
      } break;
      case 4 : {
        dateStr = 'Four days ago';
      } break;
      case 5 : {
        dateStr = 'Five days ago';
      } break;
      case 6 : {
        dateStr = 'Six days ago';
      } break;
    }
    if ( dif > 7 ) dateStr = 'A week ago';
    if ( dif > 2 * 7 ) dateStr = 'Weeks ago';
    if ( dif > 30 ) dateStr = 'A month ago';
    if ( dif > 2 * 30 ) dateStr = 'Months ago';
    if ( dif > 365 ) dateStr = 'A Year ago';
    if ( dif > 2 * 365 ) dateStr = 'Years ago';

    return dateStr;
  }
}
