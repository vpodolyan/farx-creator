var fs = require('fs');
var path = require('path');

module.exports = function prepareRules(filesPath, baseUrl, doneCallback) {
  fs.readdir(filesPath, (err, files) => {
    if (err) throw err;

    var rules = [];
    files.filter((file) => {
      return path.extname(file) == ".js";
    }).forEach((file)=> {
      // create rule based on filename and url
      var matchUrl = baseUrl + "/" + file;
      var fileName = path.join(filesPath, file);
      console.log("rule", matchUrl, fileName);

      // add rule to list
      rules.push(createRule(matchUrl, fileName));
    });
    doneCallback(err, rules);
  });
}

function createRule(matchUrl, fileName) {
    return {
      _attr: {
        Match: matchUrl,
        Action: fileName,
        Enabled: false
      }
    };
}
