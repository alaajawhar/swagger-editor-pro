const { Console } = require("console");
var fs = require("fs");
path = "C:\\Users\\E195\\Desktop\\STC\\Swagger Files\\STCPayWebApi.json";
try {
  let json = require(path);
  if (json["info"]) var info = json["info"];
  if (json["host"]) var host = json["host"];
  if (json["schemes"]) var schemes = json["schemes"];
  if (json["consumes"]) var consumes = json["consumes"];
  if (json["produces"]) var produces = json["produces"];
  if (json["basePath"]) var basePath = json["basePath"];
  var Filename = path.split("\\")[path.split("\\").length - 1];
  var AllDefinitions = json["definitions"];
  var Allpaths = json["paths"];
} catch (err) {
  throw "bad json file !!! recheck it please" + err;
}

var DefinitionsResults = {};
var PathsResults = {};
var searchitem = [];
function ExtractFieldsFromApi(api) {
  for (i = 0; i < api["parameters"].length; i++) {
    if (
      api["parameters"][i]["schema"] &&
      api["parameters"][i]["schema"]["$ref"]
    ) {
      arr = api["parameters"][i]["schema"]["$ref"].split("/");
      if (!searchitem.includes(arr[arr.length - 1]))
        searchitem.push(arr[arr.length - 1]);
    }
  }

  for (statusCode in api["responses"]) {
    try {
      if (api["responses"][statusCode]["schema"]) {
        if (api["responses"][statusCode]["schema"]["$ref"]) {
          // for those who does not have schema type array
          arr = api["responses"][statusCode]["schema"]["$ref"].split("/");
          if (!searchitem.includes(arr[arr.length - 1]))
            searchitem.push(arr[arr.length - 1]);
        } else if (api["responses"][statusCode]["schema"]["items"]["$ref"]) {
          //for those who have shema of type array
          arr =
            api["responses"][statusCode]["schema"]["items"]["$ref"].split("/");
          if (!searchitem.includes(arr[arr.length - 1]))
            searchitem.push(arr[arr.length - 1]);
        }
      }
    } catch (err) {
      console.log("fucking error in " + JSON.stringify(api["summary"] + err));
    }
  }

  if (api["requestBody"]) {
    if (api["requestBody"]["content"]) {
      if (api["requestBody"]["content"]["application/json;charset=UTF-8"]) {
        if (
          api["requestBody"]["content"]["application/json;charset=UTF-8"][
          "schema"
          ]
        ) {
          if (
            api["requestBody"]["content"]["application/json;charset=UTF-8"][
            "schema"
            ]["$ref"]
          ) {
            arr =
              api["requestBody"]["content"]["application/json;charset=UTF-8"][
                "schema"
              ]["$ref"].split("/");
            if (!searchitem.includes(arr[arr.length - 1]))
              searchitem.push(arr[arr.length - 1]);
          }
        }
      }
    }
  }
  if (api["responses"]) {
    for (response in api["responses"]) {
      if (api["responses"][response]["content"]) {
        if (
          api["responses"][response]["content"][
          "application/json;charset=UTF-8"
          ]
        ) {
          if (
            api["responses"][response]["content"][
            "application/json;charset=UTF-8"
            ]["schema"]
          ) {
            if (
              api["responses"][response]["content"][
              "application/json;charset=UTF-8"
              ]["schema"]["$ref"]
            ) {
              arr =
                api["responses"][response]["content"][
                  "application/json;charset=UTF-8"
                ]["schema"]["$ref"].split("/");
              if (!searchitem.includes(arr[arr.length - 1]))
                searchitem.push(arr[arr.length - 1]);
            }
          }
        }
      }
    }
  }
}
function ExtractFieldsFromPath(path, api) {
  if (AllDefinitions[path]) {
    if (PathsResults[path]) {
      PathsResults[path][api] = Allpaths[key][api];
    } else {
      PathsResults[path] = { [api]: Allpaths[key][api] };
    }
    ExtractFieldsFromApi(Allpaths[path][api]);
  } else {
    console.log(`the path : ${path} is wrong`);
  }
}
function Scan_Subfields_Of_Field(field) {
  // use it in the first line of the code ta t5ales 7alak
  if (AllDefinitions[field]) {
    if (AllDefinitions[field]["properties"]) {
      for (prop in AllDefinitions[field]["properties"]) {
        if (
          AllDefinitions[field]["properties"][prop]["items"] &&
          AllDefinitions[field]["properties"][prop]["items"]["$ref"]
        ) {
          arr =
            AllDefinitions[field]["properties"][prop]["items"]["$ref"].split(
              "/"
            );
          if (!searchitem.includes(arr[arr.length - 1]))
            searchitem.push(arr[arr.length - 1]);
        }
        if (AllDefinitions[field]["properties"][prop]["$ref"]) {
          arr = AllDefinitions[field]["properties"][prop]["$ref"].split("/");
          if (!searchitem.includes(arr[arr.length - 1]))
            searchitem.push(arr[arr.length - 1]);
        }
      }
    }
  } else
    console.log("ScanSubfieldsOfField --> if(AllDefinitions[field]) --> else");
}
function ExtractAllSubfieldsOf_AllDefintions() {
  for (i = 0; i < searchitem.length; i++) {
    Scan_Subfields_Of_Field(searchitem[i]);
  }
}
function generateAllDefinitions() {
  for (i = 0; i < searchitem.length; i++) {
    DefinitionsResults[searchitem[i]] = AllDefinitions[searchitem[i]];
  }
}
function DefinitionsCreation(path, api) {
  if (Allpaths[path]) {
    if (Allpaths[path][api]) ExtractFieldsFromApi(Allpaths[path][api]);
    ExtractAllSubfieldsOf_AllDefintions();
  } else {
    console.log("path : " + path + "   :   api : " + api + "is not found");
  }
}
function PathsCreation(path, api) {
  if (Allpaths[path]) {
    if (Allpaths[path][api]) {
      if (!PathsResults[path]) PathsResults[path] = {};
      PathsResults[path][api] = Allpaths[path][api];
    } else console.log(`"${api}" of "${path}" is not exist`);
  } else console.log(`${path} is not exist`);
}
class swagger {
  static add(path, api) {
    PathsCreation(path, api);
    DefinitionsCreation(path, api);
  }
  static create() {
    var swaggertext = {};
    generateAllDefinitions();
    swaggertext["swagger"] = "2.0";
    swaggertext["info"] = info;

    swaggertext["host"] = host;
    swaggertext["basePath"] = basePath;
    swaggertext["schemes"] = schemes;
    swaggertext["consumes"] = consumes;
    swaggertext["produces"] = produces;

    swaggertext["paths"] = PathsResults;
    swaggertext["definitions"] = DefinitionsResults;
    fs.mkdir("Generators", { recursive: true }, (err) => {
      if (err) throw err;
    });
    fs.writeFile(
      `.\\Generators\\Swagger.json`,
      JSON.stringify(swaggertext, null, 4),
      function (err) {
        if (err)
          console.log(
            "error occupied when swagger file writting is processing"
          );
        else console.log(`Swagger.json file was successfully created`);
      }
    );
  }
}

module.exports.swagger = swagger;
swagger.add("/AccountTransfer/v2/Inquiry", "post");
// swagger.add("/Customer/v2/Account", "get");
//swagger.add("path", "api");
//swagger.add("path", "api");
//swagger.add("path", "api");
//swagger.add("path", "api");
//swagger.add("path", "api");
//swagger.add("path", "api");
swagger.create();

// var addheaders = require('./AddHeaders.js');
// addheaders.addheaders();
