require 'mongo'
include Mongo

mongo_client = MongoClient.new("localhost", 27017)
db = mongo_client.db("sunfinder")
coll = db.collection("cities")

File.open("../IT.txt").each do |line|
  columns = line.split("\t");
  city_name = columns[1]
  lat = columns[4]
  lon = columns[5]
  country = columns[8]
  type = columns[6]
  subtype = columns[7]

  if (type == 'A' and subtype.start_with?('ADM2'))
    p city_name
    doc = {"name" => city_name, "country" => country, "loc" => [lat.to_f, lon.to_f] }
    coll.insert(doc)
  end
  
end