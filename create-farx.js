var fs = require('fs');
var path = require('path');
var url = require('url');
var data2xml = require('data2xml');
var convert = data2xml({xmlheader: '<?xml version="1.0" standalone="yes" ?>\n'});

const defaultFiddlerVer = "4.6.2.3";

if (process.argv.length < 3) {
  console.log("Please specify path to a directory with js files ");
  return;
}

if (process.argv.length < 4) {
  console.log("Please specify rule url to be matched");
  return;
}

console.log(process.argv);

const filesPath = process.argv[2];
var baseUrl = process.argv[3];

console.log("BASE URL = " + baseUrl);

// prepare js files
fs.readdir(filesPath, (err, files) => {
  if (err) throw err;

  files.filter((file) => {
    return file;//path.extname(file) == ".js";
  }).forEach((file)=> {
    // create rule based on filename and url
    var matchUrl = baseUrl + "/" + file;
    var fileName = path.join(filesPath, file);
    console.log(matchUrl, fileName);
  });
});

var xml = convert(
  "AutoResponder",
  {
    _attr: { LastSave: new Date().toISOString(), FiddlerVersion: "4.6.2.3"  },
    State: {
      _attr: { Enabled: false, Fallthrough: false, UseLatency: false },
      ResponseRule: {
        _attr: {
          Match: "https://www-test.bmednet.it/lr/html/js/med/nac/conversione/fondi_terzi/fondi_terzi.js",
          Action: "C:\\DevRootMediolanum\\Projects\\lr\\html\\js\\med\\nac\\conversione\\fondi_terzi\\fondi_terzi.js",
          Enabled: false
        }
      }
    }
});

console.log(xml);

fs.writeFile("auto-response.farx", xml, (err) => {
  if (err) throw err;
  console.log("File has been created!");
});
