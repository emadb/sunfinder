var async = require('async');

var http = require('http');
http.createServer(function (req, res) {

    var async = require('async');
    var functions = [];

    functions.push(
        function(callback){ 
            setTimeout( function(){
                callback(null,test1(1));
            }, 500 );
        }
    );
    functions.push(function(callback){ setTimeout( function(){callback(null,test1(2));}, 500 )});
    functions.push(function(callback){ setTimeout( function(){callback(null,test1(3));}, 500 )});

    async.parallel(functions, function(err, result){
        console.log('complete', result);
    });

    function test1 (value){
        return "hello " + value;
    }
}).listen(3000, "127.0.0.1");


