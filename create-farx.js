var fs = require('fs');
var data2xml = require('data2xml');
var convert = data2xml({xmlheader: '<?xml version="1.0" standalone="yes" ?>\n'});

const defaultFiddlerVer = "4.6.2.3";

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

fs.writeFile("auto-response.xml", xml, (err) => {
  if (err) throw err;
  console.log("File has been saved!");
});
