const express = require('express');
const bodyParser = require('body-parser');
const NspmQuestionService = require('./services/NsmpQuestionService');
const DBpediaSparqlClient = require('./services/DBpediaSparqlClient');
const SparqlResponseService = require('./services/SparqlResponseService');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function getPreferredLanguage(req) {
    return req.body.preferredLanguage !== undefined ? req.body.preferredLanguage : 'en';
}

app.post('/sparql', (req, res) => {
    let dbpediaSparqlClient = new DBpediaSparqlClient();
    let sparqlResponseService = new SparqlResponseService();

    dbpediaSparqlClient.execute(req.body.question)
        .then(
            function (response) {
                res.status(200).json(
                    sparqlResponseService.responseSuccess(response, getPreferredLanguage(req), req.body.question)
                );
            }, function (error) {
                res.status(500).json(sparqlResponseService.responseError(req.body.question));
            }).catch(
        function (reason) {
            res.status(500).json(sparqlResponseService.responseError(req.body.question));
        }
    );
});

app.post('/nspm', (req, res) => {
    let nspmQuestionService = new NspmQuestionService();
    let dbpediaSparqlClient = new DBpediaSparqlClient();
    let sparqlResponseService = new SparqlResponseService();

    let sparqlQuery = nspmQuestionService.getSparqlQuery(req.body.question);
    dbpediaSparqlClient.execute(sparqlQuery)
        .then(
            function (response) {
                res.status(200).json(
                    sparqlResponseService.responseSuccess(response, getPreferredLanguage(req), sparqlQuery)
                );
            }, function (error) {
                res.status(500).json(sparqlResponseService.responseError(sparqlQuery));
        }).catch(
            function (reason) {
                res.status(500).json(sparqlResponseService.responseError(sparqlQuery));
            }
        );
});

app.post('/nspm_training_data', (req, res) => {
    let nspmQuestionService = new NspmQuestionService();
    if (req.body.question === undefined || req.body.query === undefined) {
        res.status(400).json({error: "question and query parameter required"});
        return;
    }
    nspmQuestionService.addTrainingData(req.body.question, req.body.query);
    res.status(200).json({});
});

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});