var express = require('express');   
var app = express();  
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.get('/blog', function (req, res) {  
    // http://localhost:3000/blog 
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
         db.db("software").collection("blog").find({}).limit(5).toArray(function(err, result) {
          if (err) throw err;
          res.send(JSON.stringify(result))
          db.close();
        });
      }); 
    console.log("Got a GET request for the homepage");  
   
 })  

 app.get('/add', function (req, res) {  
    // http://localhost:3000/add?id=9&titel=blog titel&content=blog content&image=image path&user=user name

var obj={
    "id":req.query.id,
    'titel':req.query.titel,
    'content':req.query.content,
    'image':req.query.image,
    'date':req.query.date,
    'user':req.query.user
}
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.db("software").collection("blog").insertOne(obj, function(err, res1) {
          if (err) throw err;
         console.log("1 document inserted");       
         res.json({status:"add sucsess"})  

          db.close();  

        });
      });          

      // console.log("Got a GET request for the homepage");  
    // res.send('Welcome to JavaTpoint!');  
 })  

 app.get('/find', function (req, res) {  
// http://localhost:3000/find?id=9

    MongoClient.connect(url, function(err, db) {({}).toArray
        if (err) throw err;
         db.db("software").collection("blog").find({"id" : req.query.id}).toArray(function(err, result) {
          if (err) throw err;
          res.send(JSON.stringify(result))
          db.close();
        });
      }); 
    console.log("Got a GET request for the homepage");  
    // res.send('point!');  
 })  


 app.get('/delete', function (req, res) {  
// http://localhost:3000/delete?id=15

    MongoClient.connect(url, function(err, db) {
        if (err) throw err; 
         db.db("software").collection("blog").deleteOne({"id" : req.query.id}, function(err, obj) {
          if (err) throw err;
          console.log("1 document deleted");    
          res.json({status:"deleted sucsess"})  

          db.close();
        });
    });          

    console.log("Got a GET request for the homepage");  
 })  

 
var server = app.listen(3000, function () {
console.log("Example app listening at http://localhost:3000")  
})  