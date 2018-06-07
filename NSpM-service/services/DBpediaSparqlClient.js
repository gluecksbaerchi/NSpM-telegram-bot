"use strict";

module.exports = class DBpediaSparqlClient {

    execute(sparqlQuery) {
        const {SparqlClient, SPARQL} = require('sparql-client-2');
        const client =
            new SparqlClient('http://dbpedia.org/sparql')
                .register({
                    db: 'http://dbpedia.org/resource/',
                    dbpedia: 'http://dbpedia.org/property/'
                });

        return client.query(SPARQL``+ sparqlQuery +``).execute();
    }
};