const express = require('express');
const bodyParser = require('body-parser');
const NspmQuestionService = require('./services/NsmpQuestionService');
const DBpediaSparqlClient = require('./services/DBpediaSparqlClient');
const SparqlResponseService = require('./services/SparqlResponseService');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sparql', (req, res) => {
    let dbpediaSparqlClient = new DBpediaSparqlClient();
    let sparqlResponseService = new SparqlResponseService();

    dbpediaSparqlClient.execute(req.body.question)
        .then(
            function (response) {
                res.status(200).json(
                    sparqlResponseService.responseSuccess(response)
                );
            }, function (error) {
                res.status(500).json(sparqlResponseService.responseError());
            }).catch(
        function (reason) {
            res.status(500).json(sparqlResponseService.responseError());
        }
    );
});

app.post('/nspm', (req, res) => {
    let nspmQuestionService = new NspmQuestionService();
    let dbpediaSparqlClient = new DBpediaSparqlClient();
    let sparqlResponseService = new SparqlResponseService();

    dbpediaSparqlClient.execute(nspmQuestionService.getSparqlQuery(req.body.question))
        .then(
            function (response) {
                res.status(200).json(
                    sparqlResponseService.responseSuccess(response)
                );
            }, function (error) {
                res.status(500).json(sparqlResponseService.responseError());
        }).catch(
            function (reason) {
                res.status(500).json(sparqlResponseService.responseError());
            }
        );
});

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});