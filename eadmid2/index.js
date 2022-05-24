const http = require('http');
const path=require('path');
const app=express();
var mongodb = require('mongodb');
const express=require('express');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const middleware = require("./middlewares/");
app.use(fileUpload());
app.use("/images", express.static("public/img"));
app.use(bodyParser.json());
var urlencodedParser=(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017');
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/' ,function(req,res){
    res.sendFile(__dirname,'signup.ejs');
});
app.post('/',urlencodedParser,function(req,res){
    dbConn.then(function(db){
        delete req.body._id; // for safety reasons
        db.collection('formdata').insertOne(req.body);
    });
    res.send('Data received:\n' + JSON.stringify(req.body));
});

app.listen(3000, function () {
    console.log("listening at port 3000");
  });