var express = require('express');  
var passport = require('passport');
var router = express.Router();
var mongodb = require('mongodb');
var session = require('express-session');

router.use(session({secret: "somesecret", saveUninitialized: true, resave: true}));

router.get('/', function(req, res, next) {  
  res.render('index');
});


router.get('/dashboard', function(req, res){
  var mongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017/hack";

  mongoClient.connect(url, function(err, db){
    if(err)
      console.log("DB connection error");
    else {
      //console.log("DB connection established");
      var collection = db.collection('audios');
      collection.find({}).toArray(function(err, result){
        if(err){
          console.log("error reading data");
        }
        else
          res.render("dashboard.ejs", {"audios": result, message: req.flash()});
      });
    }
});
});

router.get('/showdetail/:aud', function(req, res){
  var mongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017/hack";

  mongoClient.connect(url, function(err, db){
    if(err)
      console.log("DB connection error");
    else{
      //console.log("DB connection established");
      var collection = db.collection('audios');
      collection.find({voiceName: req.params.aud}).toArray(function(err, result){
        if(err)
          console.log("error reading data");
        else
          res.render("calldetails.ejs", {"audios": result[0], message: req.flash()});
      });
    }
});
  //res.render('calldetails', {"detail": req.params.aud});
});

router.get('/graph1', function(req, res){
  res.render('graphs1.ejs');
});

router.get('/graph2', function(req, res){
  res.render('graphs2.ejs');
});

router.get('/detGraph1', function(req, res){
  res.render('detgraph1.ejs');
});

router.get('/detGraph2', function(req, res){
  res.render('detgraph2.ejs');
});

module.exports = router;
