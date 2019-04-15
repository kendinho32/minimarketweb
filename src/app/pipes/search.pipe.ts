import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if (term === undefined || term === null) {
        return items;
    }

    return items.filter(function (item: any) {
        return item.name.toLowerCase().includes(term.toLowerCase());
    });
  }

}
