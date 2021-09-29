import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiBrief } from '../models/Api-brief.model';
import *  as action from '../store/swagger.action';

@Component({
  selector: 'app-browse-display-apis',
  templateUrl: './browse-display-apis.component.html',
  styleUrls: ['./browse-display-apis.component.css']
})
export class BrowseDisplayApisComponent implements OnInit {
  fileName: string = '';
  originalSwaggerApis: ApiBrief[] = [];
  swaggerApis: ApiBrief[] = [];


  constructor(
    private orginalSwaggerStore: Store<{ swaggerApis: { swagger: ApiBrief[] } }>) { }

  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    if (event.target == null) {
      return;
    }
    this.fileName = event.target.files[0].name;

    const reader = new FileReader();
    // @ts-ignore
    reader.onload = event => console.log(event.target.result)
    reader.readAsText(event.target.files[0])
  }

  addApiToBeGenerated() {
    console.log('added')
  }

  deleteApiFromToBeGenerated() {
    console.log('delete')
  }


}

    // // ADD NEW API
    // this.orginalSwaggerStore.dispatch(new action.AddApiAction(new ApiBrief('DELETE', 'map/v3/deleteUser', false)));

    // // ADD SWAGGER APIS
    // const swaggerApis: ApiBrief[] = [
    //   new ApiBrief('PATCH', 'map/v3/createUser', false),
    //   new ApiBrief('UPDATE', 'map/v3/deleteUser', false)
    // ];
    // this.orginalSwaggerStore.dispatch(new action.AddApis(swaggerApis))

    // // DELETE SWAGGER API
    // this.orginalSwaggerStore.dispatch(new action.DeleteApi(new ApiBrief('DELETE', 'map/v3/deleteUser', false)));

    // // FETCH
    // this.orginalSwaggerStore.select('swaggerApis').subscribe(s => {
    //   this.originalSwaggerApis = s.swagger;
    //   console.log(s.swagger);
    // })