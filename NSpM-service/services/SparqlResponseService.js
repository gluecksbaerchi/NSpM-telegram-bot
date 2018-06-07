"use strict";

const preferredLanguage = 'en';

module.exports = class SparqlResponseService {

    responseSuccess(response) {
        let status = 'no_result';
        let displayText = "I don't know. ¯\\_(ツ)_/¯";
        let uris = [];
        if (response.boolean !== undefined) {
            displayText = response.boolean === true ? 'Yes' : 'No';
            status = 'ok';
        }

        if (response.results !== undefined && response.results.bindings !== undefined && response.results.bindings.length > 0) {
            status = 'ok';
            let resultFound = false;
            response.results.bindings.forEach(function (result) {
                if (result['a']['type'] === 'uri') {
                    uris.push(result['a']['value']);
                    displayText = 'Have a look at the uris.';
                    resultFound = true;
                } else {
                    if (result['a']['xml:lang'] === preferredLanguage) {
                        displayText = result['a']['value'];
                        resultFound = true;
                    }
                }
            });
            if (!resultFound) {
                displayText = response.results.bindings[0]['a']['value'];
            }
        }

        return {
            answer: displayText,
            uris: uris,
            status: status
        }
    }

    responseError() {
        return {
            answer: "An error occurs",
            uris: [],
            status: 'error'
        }
    }
};