// var rest = require('restler');

// //http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139

// //rest.get(baseUrl + '/place/' + startingLocation + '/siblings?appid=' + appid).on('complete', findNeighbors);



// var MongoClient = require('mongodb').MongoClient


// var url = "mongodb://localhost:27017/sunfinder";


// Object.prototype.getName = function() { 
//    var funcNameRegex = /function (.{1,})\(/;
//    var results = (funcNameRegex).exec((this).constructor.toString());
//    return (results && results.length > 1) ? results[1] : "";
// };

// MongoClient.connect(url, function(err, client) {
//     var collection = client.collection('cities');
//     var count = collection.count();
    
//     var brescia = [45.52478, 10.22727];
//     var palermo = [38.11572, 13.36143];
//     var distance = 100;

//     cursor = collection.find( {loc:{$near: brescia, $maxDistance: distance/111.12}});
//     cursor.each(function(err, doc) {
//         if (doc != null)
//         {
//             var  url = "http://api.openweathermap.org/data/2.5/weather?lat="+ doc.loc[0] + "&lon=" + doc.loc[1] + "&units=metric&lang=it";
//             rest.get(url).on('complete', function(result){
                
//                 var meteo = JSON.parse(result);
//                 if (meteo.clouds.all < 40){
//                     console.log(meteo.name, meteo.weather[0].main, meteo.clouds.all);    
//                 }                
//             });
//         }
//         client.close();
//     });
    

    
// });
