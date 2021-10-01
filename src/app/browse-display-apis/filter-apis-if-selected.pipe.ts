import { Pipe, PipeTransform } from '@angular/core';
import { ApiBrief } from '../models/Api-brief.model';

@Pipe({
  name: 'filterApisIfSelected',
  pure: false
})
export class FilterApisIfSelectedPipe implements PipeTransform {

  transform(apiBriefsArray: ApiBrief[],searchItem:string, ...args: unknown[]): ApiBrief[] {
    // return apiBriefsArray.filter(apibrief =>{
    //   return apibrief.selected === true;
    // })

    return apiBriefsArray.filter(apibrief =>{
      console.log(searchItem.length !==0);
      if(searchItem !== undefined && searchItem.length !==0){
        console.log('it works: ' + searchItem )
        return apibrief.selected === true && apibrief.endpoint.toLowerCase().includes(searchItem.toLowerCase());
      }
      return apibrief.selected === true ;
    })

  }

}
