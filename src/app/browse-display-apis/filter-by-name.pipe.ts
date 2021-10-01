import { Pipe, PipeTransform } from '@angular/core';
import { ApiBrief } from '../models/Api-brief.model';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(value: Array<ApiBrief>, ...args: unknown[]): Array<ApiBrief> {
    return value;
  }

}
