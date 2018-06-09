"use strict";

const fs = require('fs');

module.exports = class NspmQuestionService {

    getSparqlQuery(question) {
        let shell = require('shelljs');
        let nspmResult = shell.exec('cd ../NSpM/ && sh ask.sh data/monument_300 "' + question + '"').stdout;
        return nspmResult.substring(nspmResult.lastIndexOf("ANSWER IN SPARQL SEQUENCE:") + 27);
    }

    addTrainingData(question, query) {

        if (!fs.existsSync('../NSpM/data/collected_training_data')) {
            fs.mkdirSync('../NSpM/data/collected_training_data');
        }
        fs.appendFile('../NSpM/data/collected_training_data/training_data.en', question + '\n', function (err) {
            if (err) throw err;
            fs.appendFile('../NSpM/data/collected_training_data/training_data.sparql', query + '\n', function (err) {
                if (err) throw err;
            });
        });
    }
};