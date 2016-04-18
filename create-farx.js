var data2xml = require('data2xml');
var convert = data2xml({xmlheader: '<?xml version="1.0" standalone="yes" ?>\n'});

var xml = convert(
  "AutoResponder",
  {
    SimpleData : 'Simple Value',
    ComplexData: {
      _attr: { version: "4.6"}
    }
});

console.log(xml);
