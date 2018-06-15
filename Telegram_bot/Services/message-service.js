module.exports = {

    start_msg :
`Welcome, you can use the following commands.
/ask - Ask a Question
/query - Query DBPedia
/cat - because everyone loves cats

Tip: type /help to get to know the commands in more detail`,
    help_msg : `What do you want to do?`,
    inline_ask_msg : `Ask a Question`,
    inline_query_msg : `Query DBPedia`,
    inline_ask_answer : `type /ask followed by your question`,
    inline_query_answer : `type /query followed by your SPARQL query. You don\'t need to define prefixes because DBPedia knows most of them.`,
    ask_param_msg : 'You need to tell me your question after /ask if you want me to answer.',
    query_param_msg : 'You need to write your SPARQL query after /query if you want me to answer.',
    ask_err_msg : 'Something went wrong. Maybe I can\'t answer your question.',
    query_err_msg : 'Something went wrong. Maybe your query is wrong or to complex.',
    training_msg: 'If this is the answer you were looking for you can add the question to nspm training data. Do you want to add the question?',
    training_yes : '*-Yeah sure!-*',
    training_no : '*-No!-*',
    training_answer_succes : 'Question added.',
    training_answer_fail : 'Question not added.',
    training_answer_no : 'Maybe the next answer will suit you.',
    training_answer_fail : 'An error occured, please try again.',

    get_answer_by_type : function(body){

        switch (body.type) {
            case 'boolean':
                return body.value ? 'Yes' : 'No';
                break;
            case 'string':
                return body.value;
                break;
            case 'uri_list':
                var result = 'Check those uris!\n'

                for (var i = 0; i < body.value.length; i++) {
                    result = result.concat(body.value[i] + '\n\n');
                }
                return result;
                break;
            default:
                return 'I have an answer but don\'t know how to present it to you.';
        }
    }
};