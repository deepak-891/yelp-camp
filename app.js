var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create(    
    
//         {
//             name: "fuckoff", 
//             image: "https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e50744075277cd59f4bcc_340.jpg",
//             description: "THIs a one of the wierd places you would ever want to go in you life"
//         },
//      function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("NEWLY CREATED CAMPGROUND");
//             console.log(campground);
//         }
//     }
// ); 

// var campgrounds = [
//     {name: "fuckoff", image: "https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e50744075277cd59f4bcc_340.jpg"},
//     {name: "Mann", image: "https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e50744075277cd59f4bcc_340.jpg"},
// ];

app.get("/", function(req, res ){

    res.render("landing");
});
 

app.get("/campgrounds", function(req, res ){


       Campground.find({},function(err, allcampgrounds){
           if(err){
               console.log(err);
           }else{
               res.render("index",{campgrounds:allcampgrounds})
           }
       })  
    // res.render("campground",{campgrounds:campgrounds});
});
 

app.post("/campgrounds", function(req, res ){

    ///get data form form and add to campground array 
    
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    
    var newCampground = {name: name, image: image, description:description};
    //Create a new campground and save to db
    Campground.create(newCampground,function(err, newlyCreated){
        if(err){
                console.log(err);
        }   else{
            console.log(newlyCreated);
        } 
    })

    //redirect back to campgrounf page 
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
    res.render("new");
});

//Show - show more info 
app.get("/campgrounds/:id",function(req,res){
    // find the campground by id 
    // render the page 
    Campground.findById(req.params.id, function(err, foundCampground){
              if(err){
                  console.log(err);
              }  else{
                  res.render("show", {campground: foundCampground });
              }
    });
});


app.listen(3000, function(){
    console.log("THe YelpCamp Server Has started");

});