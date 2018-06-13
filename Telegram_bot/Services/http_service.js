const http = require('http');
const req = require('request');


module.exports = {

    post_question : function(message,callback)
    {
        return req({
            url: 'http://nspm:5000/nspm',
            method: 'POST',
            json: {question: message}
        }, function(error, response, body){
            if (error || response.statusCode !== 200) {
                return callback(error || {statusCode: response.statusCode});
            }
            callback(null,body);
        });

    },

    post_query : function(query,callback)
    {
        return req({
            url: 'http://nspm:5000/sparql',
            method: 'POST',
            json: {question: query}
        }, function(error, response, body){
            if (error || response.statusCode !== 200) {
                return callback(error || {statusCode: response.statusCode});
            }
            callback(null,body);
        });
    },

    post_training : function(question,query,callback)
    {
        return req({
            url: 'http://nspm:5000/nspm_training_data',
            method: 'POST',
            json: {question: question, query: query}
        }, function(error, response, body){
            if (error || response.statusCode !== 200) {
                return callback(error || {statusCode: response.statusCode});
            }
            callback(null,body);
        });
    }


};

