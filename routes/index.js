var rest = require('restler');
var MongoClient = require('mongodb').MongoClient
var _ = require('underscore'); 
var async = require('async');


exports.index = function(req, res){
  res.render('index', { title: 'Sunfinder' });
};

exports.weather = function(req, res){
    var connectionUri = process.env.CUSTOMCONNSTR_MONGOLAB_URI; 
    //connectionUri = "mongodb://localhost:27017/sunfinder"
	
	MongoClient.connect(connectionUri, function(err, client) {
	    var collection = client.collection('cities');
	    
	    var lat = parseFloat(req.query['lat']);
	    var lon = parseFloat(req.query['lon']);
        var distance = parseFloat(req.query['km']);

	    var results = [];
	    var semaphore = true;

	    cursor = collection
	    	.find( {loc:{$near: [lat, lon], $maxDistance: distance/111.12}})
	    	.toArray(function(err, docs){
	    	var functions = [];

	    	_.each(docs, function(doc){
	    		if (doc != null)
			    {   	
			       	functions.push(function(callback){ 
                        setTimeout(getWeather(doc, callback), 1);
                    });
		        }    			
    		});

            async.parallel(functions, function(err, results){
                client.close();
                res.send(results);
            })
    	});
	});
};


function getWeather(doc, callback){
	var  url = "http://api.openweathermap.org/data/2.5/weather?lat="+ doc.loc[0] + "&lon=" + doc.loc[1] + "&units=metric&lang=it";
    rest.get(url).on('complete', function(result) {
        if (result.length > 0){
            var meteo = JSON.parse(result);
            if (parseInt(meteo.clouds.all) < 40){
            	 callback(null, {name: meteo.name, condition: meteo.weather[0].main, clouds: meteo.clouds.all});
            } else {
                callback(null, {name: '', condition: '', clouds: ''});
            }     
        }
    });
}