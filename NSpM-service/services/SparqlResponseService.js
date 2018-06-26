"use strict";

module.exports = class SparqlResponseService {

    responseSuccess(response, preferredLanguage, query) {
        let status = 'error';
        let type = 'string';
        let value = '';
        if (response.boolean !== undefined) {
            type = 'boolean';
            value = response.boolean === true ? 1 : 0;
            status = 'ok';
        }

        if (response.results !== undefined && response.results.bindings !== undefined && response.results.bindings.length > 0) {
            status = 'ok';
            let resultFound = false;
            response.results.bindings.forEach(function (result) {
                if (result['a']['type'] === 'uri') {
                    if (typeof value === "string") {
                        value = [];
                        type = 'uri_list';
                    }
                    value.push(result['a']['value']);
                    resultFound = true;
                } else {
                    if (result['a']['xml:lang'] === preferredLanguage) {
                        value = result['a']['value'];
                        resultFound = true;
                    }
                }
            });
            if (!resultFound) {
                value = response.results.bindings[0]['a']['value'];
            }
        }

        return {
            query: query.replace(/(\r\n|\n|\r)/gm,""),
            value: value,
            type: type,
            status: status
        }
    }

    responseError(query) {
        return {
            query: query,
            value: "An error occurs",
            type: "string",
            status: 'error'
        }
    }
};