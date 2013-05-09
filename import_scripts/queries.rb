#Example queries using the MongoDB Ruby Driver not a pattern for development


require 'mongo'

class Place
  attr_accessor :name, :_id, :dis
  
  def initialize args={}
    args.each do |k,v|
      instance_variable_set("@#{k}", v) unless v.nil?
    end
  end
  
  def create
    if self._id.blank?
      self._id = Place.coll.insert(
      'name' => @name,
      'loc' => @loc)
    end
    
    return self
  end
  #atomic update coll.update({"_id" => doc["_id"]}, {"$set" => {"name" => "MongoDB Ruby"}})  
  
  
  def loc=(loc)
    @loc = loc
  end
  
  def loc
    @loc ||= [0,0]
  end
  
  class << self
    PC = proc {|row| Place.new(row)}
  
    #db.places.find( {'name' : /Ryan*/ })
    def find args={}
      coll.find(args).collect &PC
    end
  
    #db.places.findOne( {'name' : /Ryan*/ })
    def find_one args={}
      Place.new(coll.find_one(args))
    end  
  
    #
    def near maxDistance=5, point=[-87.63173, 41.89107]
      coll.find( {'loc' => {"$near" => point, 
        "$maxDistance" => miles_to_degrees(maxDistance)}}).collect &PC
    end
  
    #db.places.find( {loc : { $within : {$center : [[-87.63173, 41.89107], 0.0013] } } })
    def within_center radian=0.0013, center=[-87.63173, 41.89107]
      coll.find( {"loc" => {"$within" => {"$center" => [center, radian] }}}).collect &PC
    end
  
    def within_center_sphere radian=0.0013, center=[-87.63173, 41.89107]
      coll.find( {'loc'=> 
        {"$within" => 
          {"$centerSphere" => [ center, radian ]} } }).collect &PC
    end
    
    def within_center_sphere_miles miles=100, center=[-87.63173, 41.89107]
      within_center_sphere miles_to_radian(miles), center
    end
    
    def within_box box=[ [-87.62, 41.88], [-87.6651, 41.9474 ]]
      coll.find( {"loc" => { "$within" => {"$box" => box}}}).collect &PC
    end
    
    def within_polygon polygon
      coll.find( {"loc" => { "$within" => {"$polygon" => polygon}}}).collect &PC
    end
    
    def get_distances point=[-87.63173, 41.89107]
      command = db.command({"geoNear" => 'places', 'near' => point, "num" => 10})
      command["results"].collect &PC
    end
    
    def miles_to_degrees miles
      miles.to_f/69
    end
    
    def miles_to_radian miles
      miles.to_f / 3959
    end
  
    def db
      db = Mongo::Connection.new.db("geospatial_test")
    end
  
    def coll
      coll = self.db.collection("places")
    end
  
    def create_index
      Place.coll.create_index([['loc', Mongo::GEO2D]])
    end  
  end
end