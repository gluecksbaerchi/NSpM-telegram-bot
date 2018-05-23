const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const preferedLanguage = 'en';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/version', (req, res) => {
    res.status(200).send("APIAI Webhook Integration. Version 1.0");
});

app.get('/', (req, res) => {
    res.status(200).send("Hello from APIAI Webhook Integration.");
});

/* Handling all messenges */
app.post('/webhook', (req, res) => {
    let question = req.body.result.parameters["question"];

    let shell = require('shelljs');
    let nspmResult = shell.exec('cd ../NSpM/ && sh ask.sh data/monument_300 "' + question + '"').stdout;
    let sparqlQuery = nspmResult.substring(nspmResult.lastIndexOf("ANSWER IN SPARQL SEQUENCE:") + 27);

    const {SparqlClient, SPARQL} = require('sparql-client-2');
    const client =
        new SparqlClient('http://dbpedia.org/sparql')
            .register({
                db: 'http://dbpedia.org/resource/',
                dbpedia: 'http://dbpedia.org/property/'
            });

    // todo: timeout
    client
        .query(SPARQL``+ sparqlQuery +``)
        .execute()
        .then(function (response) {
            let displayText = "I don't know. ¯\\_(ツ)_/¯";
            if (response.boolean !== undefined) {
                displayText = response.boolean === true ? 'Yes' : 'No';
            }
            if (response.results !== undefined && response.results.bindings !== undefined) {
                console.log(response.results.bindings);
                let resultInPreferedLanguageFound = false;
                response.results.bindings.forEach(function (result) {
                    if (result['a']['xml:lang'] === preferedLanguage) {
                        displayText = result['a']['value'];
                        resultInPreferedLanguageFound = true;
                    }
                });
                if (!resultInPreferedLanguageFound) {
                    displayText = response.results.bindings[0]['a']['value'];
                }
            }


            console.log(response);

            res.status(200).json({
                speech: question,
                query: sparqlQuery,
                displayText: displayText,
                source: 'DBPedia'});
        }, function (error) {
            res.status(200).json({
                speech: question,
                query: sparqlQuery,
                displayText: "An error occurs",
                source: 'DBPedia'});
        });
});

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});