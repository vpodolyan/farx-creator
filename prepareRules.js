var fs = require('fs');
var path = require('path');
var url = require('url');

module.exports = function prepareRules(filesPath, baseUrl, handleSubdirs, doneCallback) {
    var rules = [];

    // get fileNames list
    var fileNames = walkSync(filesPath, [], handleSubdirs)
    fileNames.filter((fileName) => {
        return path.extname(fileName) == ".js";
    }).forEach((fileName) => {
        // create rule based on filename and url
        var relativePath = path.relative(filesPath, fileName);
        var matchUrl = url.resolve(baseUrl, relativePath);
        var absFileName = path.resolve(filesPath, relativePath);
        console.log("rule", matchUrl, absFileName);

        // add rule to list
        rules.push(createRule(matchUrl, absFileName));
    });

    doneCallback(undefined, rules);
}

// List all files in a directory, recursively if recurs is true
function walkSync(dir, fileList, recurs) {
    var files = fs.readdirSync(dir);
    files.forEach(function(file) {
        var filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (recurs)
                fileList = walkSync(filePath, fileList, recurs);
        }
        else {
            fileList.push(filePath);
        }
    });
    return fileList;
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
