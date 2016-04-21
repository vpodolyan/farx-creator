#!/usr/bin/env node

var fs = require('fs');
var util = require('util');
var url = require('url');
var data2xml = require('data2xml');
var prepareRules = require('./prepareRules.js');

if (process.argv.length < 3) {
    console.log("Please specify path to a directory with js files ");
    return;
}

if (process.argv.length < 4) {
    console.log("Please specify rule url to be matched");
    return;
}

const defaultFiddlerVer = "4.6.2.3";
const filesPath = process.argv[2];
const baseUrl = util.format("%s", process.argv[3]);
const recursively = process.argv[4] == "-r" ? true : false;

console.log("BASE URL = " + baseUrl);

prepareRules(filesPath, baseUrl, recursively, (err, rules) => {
    if (err) throw err;

    console.log("Rules = ", rules);

    getXML(rules, (err, xml) => {
        if (err) throw err;

        console.log("XML = ", xml);

        fs.writeFile("auto-response.farx", xml, (err) => {
            if (err) throw err;
            console.log("auto-response.farx has been created!");
        });
    });
});

function getXML(rules, doneCallback) {
    var convert = data2xml({xmlheader: '<?xml version="1.0" standalone="yes" ?>\n'});
    try {
        var xml = convert(
            "AutoResponder",
            {
                _attr: { LastSave: new Date().toISOString(), FiddlerVersion: "4.6.2.3"  },
                State: {
                    _attr: { Enabled: false, Fallthrough: false, UseLatency: false },
                    ResponseRule: rules
                }
            }
        );
        doneCallback(undefined, xml);
    }
    catch (err){
        doneCallback(err);
    }
}
