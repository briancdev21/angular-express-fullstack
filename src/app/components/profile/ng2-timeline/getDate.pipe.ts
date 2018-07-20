import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDate'
})
export class GetDate implements PipeTransform {
  transform(date: string): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month_num = parseInt(date.split('-')[1], 10) - 1;
    const formatted_date = `${months[month_num]} ${date.split('-')[2]}`;
    return formatted_date;
  }
}
