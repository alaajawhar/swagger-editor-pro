import { Pipe, PipeTransform } from '@angular/core';
import { ApiBrief } from '../models/Api-brief.model';

@Pipe({
  name: 'filterApisIfNotSelected',
  pure: false
})
export class FilterApisIfNotSelectedPipe implements PipeTransform {

  transform(apiBriefsArray: Array<ApiBrief>,searchItem:string, ...args: unknown[]):  Array<ApiBrief> {
    return apiBriefsArray.filter(apibrief =>{
      console.log(searchItem.length !==0);
      if(searchItem !== undefined && searchItem.length !==0){
        console.log('it works: ' + searchItem )
        return apibrief.selected === false && apibrief.endpoint.toLowerCase().includes(searchItem.toLowerCase());
      }
      return apibrief.selected === false ;
    })
  }

}
