import { ArgumentOutOfRangeError } from "rxjs";
import { ApiBrief } from "../models/Api-brief.model";

export class swagger {
  json: any = {};
  Allpaths: any = {};
  AllDefinitions: any = {};
  DefinitionsResults: any = {};
  PathsResults: any = {};
  searchitem: any = [];
  info: any = {};
  host: any = {};
  schemes: any = {};
  consumes: any = {};
  produces: any = {};
  basePath: any = {};
  definitions: string = 'definitions';

  // return array of combination path-verb 
  // ex return [{path:'/map/v3/init', verb:'post'}, {path:'/map/v3/out', verb:'get'}]
  extractApisPathVerb(){
    let apiBriefsArray: ApiBrief[] = new Array<ApiBrief>();
    for(let path in this.Allpaths){
      for(let verb in this.Allpaths[path]){
        apiBriefsArray.push(new ApiBrief(verb, path,false))
      }
    }
    return apiBriefsArray;
  }

  ExtractFieldsFromApi(api: any) {
    for (let i = 0; i < api['parameters'].length; i++) {
      if (
        api['parameters'][i]['schema'] &&
        api['parameters'][i]['schema']['$ref']
      ) {
        let arr = api['parameters'][i]['schema']['$ref'].split('/');
        if (!this.searchitem.includes(arr[arr.length - 1]))
          this.searchitem.push(arr[arr.length - 1]);
      }
    }

    for (let statusCode in api['responses']) {
      try {
        if (api['responses'][statusCode]['schema']) {
          if (api['responses'][statusCode]['schema']['$ref']) {
            // for those who does not have schema type array
            let arr = api['responses'][statusCode]['schema']['$ref'].split('/');
            if (!this.searchitem.includes(arr[arr.length - 1]))
              this.searchitem.push(arr[arr.length - 1]);
          } else if (api['responses'][statusCode]['schema']['items']['$ref']) {
            //for those who have shema of type array
            let arr =
              api['responses'][statusCode]['schema']['items']['$ref'].split(
                '/'
              );
            if (!this.searchitem.includes(arr[arr.length - 1]))
              this.searchitem.push(arr[arr.length - 1]);
          }
        }
      } catch (err) {
        console.log('fucking error in ' + JSON.stringify(api['summary'] + err));
      }
    }

    if (api['requestBody']) {
      if (api['requestBody']['content']) {
        if (api['requestBody']['content']['application/json;charset=UTF-8']) {
          if (
            api['requestBody']['content']['application/json;charset=UTF-8'][
              'schema'
            ]
          ) {
            if (
              api['requestBody']['content']['application/json;charset=UTF-8'][
                'schema'
              ]['$ref']
            ) {
              let arr =
                api['requestBody']['content']['application/json;charset=UTF-8'][
                  'schema'
                ]['$ref'].split('/');
              if (!this.searchitem.includes(arr[arr.length - 1]))
                this.searchitem.push(arr[arr.length - 1]);
            }
          }
        }
      }
    }
    if (api['responses']) {
      for (let response in api['responses']) {
        if (api['responses'][response]['content']) {
          if (
            api['responses'][response]['content'][
              'application/json;charset=UTF-8'
            ]
          ) {
            if (
              api['responses'][response]['content'][
                'application/json;charset=UTF-8'
              ]['schema']
            ) {
              if (
                api['responses'][response]['content'][
                  'application/json;charset=UTF-8'
                ]['schema']['$ref']
              ) {
                let arr =
                  api['responses'][response]['content'][
                    'application/json;charset=UTF-8'
                  ]['schema']['$ref'].split('/');
                if (!this.searchitem.includes(arr[arr.length - 1]))
                  this.searchitem.push(arr[arr.length - 1]);
              }
            }
          }
        }
      }
    }
  }
  Scan_Subfields_Of_Field(field: any) {
    // use it in the first line of the code ta t5ales 7alak
    if (this.AllDefinitions[field]) {
      if (this.AllDefinitions[field]['properties']) {
        for (let prop in this.AllDefinitions[field]['properties']) {
          if (
            this.AllDefinitions[field]['properties'][prop]['items'] &&
            this.AllDefinitions[field]['properties'][prop]['items']['$ref']
          ) {
            let arr =
              this.AllDefinitions[field]['properties'][prop]['items'][
                '$ref'
              ].split('/');
            if (!this.searchitem.includes(arr[arr.length - 1]))
              this.searchitem.push(arr[arr.length - 1]);
          }
          if (this.AllDefinitions[field]['properties'][prop]['$ref']) {
            let arr =
              this.AllDefinitions[field]['properties'][prop]['$ref'].split('/');
            if (!this.searchitem.includes(arr[arr.length - 1]))
              this.searchitem.push(arr[arr.length - 1]);
          }
        }
      }
    } else
      console.log(
        'ScanSubfieldsOfField --> if(AllDefinitions[field]) --> else'
      );
  }
  ExtractAllSubfieldsOf_AllDefintions() {
    for (let i = 0; i < this.searchitem.length; i++) {
      this.Scan_Subfields_Of_Field(this.searchitem[i]);
    }
  }
  generateAllDefinitions() {
    for (let i = 0; i < this.searchitem.length; i++) {
      this.DefinitionsResults[this.searchitem[i]] =
        this.AllDefinitions[this.searchitem[i]];
    }
  }
  DefinitionsCreation(path: any, api: any) {
    if (this.Allpaths[path]) {
      if (this.Allpaths[path][api])
        this.ExtractFieldsFromApi(this.Allpaths[path][api]);
      this.ExtractAllSubfieldsOf_AllDefintions();
    } else {
      throw (
        'Combination path and verb is not found\npath : ' +
        path +
        '\nverb : ' +
        api
      );
    }
  }
  PathsCreation(path: any, api: any) {
    if (this.Allpaths[path]) {
      if (this.Allpaths[path][api]) {
        if (!this.PathsResults[path]) this.PathsResults[path] = {};
        this.PathsResults[path][api] = this.Allpaths[path][api];
      } else console.log(`"${api}" of "${path}" is not exist`);
    } else console.log(`${path} is not exist`);
  }
  constructor(swaggerJson: any) {
    try {
      this.json = swaggerJson; // require(path);
      if (JSON.parse(this.json)['info'])
        this.info = JSON.parse(this.json)['info'];
      if (JSON.parse(this.json)['host'])
        this.host = JSON.parse(this.json)['host'];
      if (JSON.parse(this.json)['schemes'])
        this.schemes = JSON.parse(this.json)['schemes'];
      if (JSON.parse(this.json)['consumes'])
        this.consumes = JSON.parse(this.json)['consumes'];
      if (JSON.parse(this.json)['produces'])
        this.produces = JSON.parse(this.json)['produces'];
      if (JSON.parse(this.json)['basePath'])
        this.basePath = JSON.parse(this.json)['basePath'];
      this.AllDefinitions = JSON.parse(this.json)[this.definitions];
      this.Allpaths = JSON.parse(this.json)['paths'];
    } catch (err) {
      throw 'bad json file !!! recheck it please';
      throw console.error('bad json file !!! recheck it please' + err);
    }
    if(Object.keys(this.AllDefinitions).length ===0){
      throw console.error("Alaa's Error\nDefinition is undefined\nchange the swagger definitions to 'definitions'");
    }
    this.extractApisPathVerb();
  }
  add(path: any, api: any) {
    this.PathsCreation(path, api);
    this.DefinitionsCreation(path, api);
  }
  create() {
    const swaggertext: any = {};
    this.generateAllDefinitions();
    swaggertext['swagger'] = '2.0';
    if (Object.keys(this.info).length !== 0) swaggertext['info'] = this.info;

    if (Object.keys(this.host).length !== 0) swaggertext['host'] = this.host;
    if (Object.keys(this.basePath).length !== 0)
      swaggertext['basePath'] = this.basePath;
    if (Object.keys(this.schemes).length !== 0)
      swaggertext['schemes'] = this.schemes;
    if (Object.keys(this.consumes).length !== 0)
      swaggertext['consumes'] = this.consumes;
    if (Object.keys(this.produces).length !== 0)
      swaggertext['produces'] = this.produces;

    if (Object.keys(this.PathsResults).length !== 0)
      swaggertext['paths'] = this.PathsResults;
    if (Object.keys(this.DefinitionsResults).length !== 0) {
      swaggertext[this.definitions] = this.DefinitionsResults;
    } else {
      throw "Alaa's Error\nDefinition is undefined\nchange the swagger definitions to 'definitions'";
      return;
    }
    return swaggertext;
  }
}
