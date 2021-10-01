import { Component, OnInit } from '@angular/core';
import { ApiBrief } from '../models/Api-brief.model';
import { swagger } from './generateSwaggerByAlaa.service';

@Component({
  selector: 'app-browse-display-apis',
  templateUrl: './browse-display-apis.component.html',
  styleUrls: ['./browse-display-apis.component.css']
})
export class BrowseDisplayApisComponent implements OnInit {
  fileName: string = '';
  json: object | undefined;
  originalSwaggerApis: ApiBrief[] = [
    new ApiBrief('PATCH', 'map/v3/createUser', false),
    new ApiBrief('PATCH', 'map/v3/createUser', false),
    new ApiBrief('PATCH', 'map/v3/createUser', false)
  ];
  newSwaggerApis: ApiBrief[] = [
    new ApiBrief('PATCH', 'map/v3/createUser', false),
    new ApiBrief('PATCH', 'map/v3/createUser', false)

  ];


  constructor() { }

  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    if (event.target == null) {
      return;
    }
    this.fileName = event.target.files[0].name;
    const reader = new FileReader();
    reader.onload = event => {
      console.log(event.target.result)
      swagger(event.target.result);
      this.json = JSON.parse(event.target.result);
      console.log(this.json)
    }
    reader.readAsText(event.target.files[0])
  }

  addApiClick() {
    console.log('added')
  }


}

// constructor(
//   private orginalSwaggerStore: Store<{ swaggerApis: { swagger: ApiBrief[] } }>) { }
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