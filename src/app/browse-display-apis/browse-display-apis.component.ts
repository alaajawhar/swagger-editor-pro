import { Component, OnInit } from '@angular/core';
import { ApiBrief } from '../models/Api-brief.model';
import { swagger } from './generateSwaggerByAlaa.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-browse-display-apis',
  templateUrl: './browse-display-apis.component.html',
  styleUrls: ['./browse-display-apis.component.css']
})
export class BrowseDisplayApisComponent implements OnInit {
  fileName: string = '';
  searchText: string='';
  //@ts-ignore
  swaggerCode: swagger;
  apiBriefsArray: ApiBrief[] = new Array<ApiBrief>();


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
      this.swaggerCode = new swagger(event.target!.result);
      this.apiBriefsArray=this.swaggerCode.extractApisPathVerb();
    }
    reader.readAsText(event.target.files[0])
  }

  addApiClick(apiBrief: ApiBrief) {
     let index: number = this.apiBriefsArray.findIndex(api =>{
      return api.endpoint===apiBrief.endpoint && api.verb===apiBrief.verb
    })
    this.apiBriefsArray[index].selected = !this.apiBriefsArray[index].selected;
  }

  onGenerateFile(){
    this.apiBriefsArray.filter( api =>{
      return api.selected === true
    }).forEach(api=>{
      console.log(api.endpoint)
      this.swaggerCode.add(api.endpoint,api.verb);
    })
    const swaggerText = this.swaggerCode.create();
    // @ts-ignore
    const blob = new Blob([swaggerText], { type: 'text/txt' });
    saveAs(blob, 'swagger.json')
  }

  onOpenFile(){
    this.apiBriefsArray.filter( api =>{
      return api.selected === true
    }).forEach(api=>{
      console.log(api.endpoint)
      this.swaggerCode.add(api.endpoint,api.verb);
    })
    const swaggerText = this.swaggerCode.create();
    // @ts-ignore
    const blob = new Blob([swaggerText], { type: 'text/txt' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }

  

  //@ts-ignore
  buttonColor(apiVerb: string){
    if(apiVerb === 'post'){
      return 'btn-outline-success';
    }

    if(apiVerb === 'get'){
      return 'btn-outline-primary';
    }

    if(apiVerb === 'put'){
      return 'btn-outline-warning';
    }

    if(apiVerb === 'delete'){
      return 'btn-outline-danger';
    }
    return 'btn-outline-secondary'
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