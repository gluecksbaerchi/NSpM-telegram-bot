"use strict";

module.exports = class NspmQuestionService {

    getSparqlQuery(question) {
        let shell = require('shelljs');
        let nspmResult = shell.exec('cd ../NSpM/ && sh ask.sh data/monument_300 "' + question + '"').stdout;
        return nspmResult.substring(nspmResult.lastIndexOf("ANSWER IN SPARQL SEQUENCE:") + 27);
    }
};