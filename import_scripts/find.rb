require 'mongo'
include Mongo

def miles_to_degrees miles
  miles.to_f/69
end

mongo_client = MongoClient.new("localhost", 27017)
db = mongo_client.db("sunfinder")
coll = db.collection("cities")
coll.create_index([['loc', Mongo::GEO2D]])

PC = proc {|row| row["name"]}

maxDistance=10
point=[45.52478, 10.22727]

result = coll.find( {'loc' => {"$near" => point, "$maxDistance" => miles_to_degrees(maxDistance)}}).collect &PC

puts result

