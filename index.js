var express = require('express'); 
const MongoClient = require('ComicDatabase').MongoClient
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))

var Comic;

var mongoose = require('mongoose');
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {
    useMongoClient: true
}); 

var db = mongoose.connection;

db.on("error", function(err){
    console.log("error connecting", err);
});

db.on("open", function(){
    console.log("database is alive");
    var comicSchema = mongoose.Schema({
        Title: String, 
        Issue: Number,
        Cost: Number,
        Publisher: String,

    });
});

Comic = mongoose.model("Comic", comicSchema);

app.get('/user', function(req, res){
    var batman = new Comic({
        title: "Batman",
        Issue: "3",
        Cost: "4.99",
        Publisher: "DC"
    });

    batman.save(function(err, theObject){
        if(err){
            res.json(err); 
        }
        res.json(batman);
    });
});

app.get("/archived", function(req, res){
    Comic.deleteOne({_id:""}, function(err, data){
        if(err){
            res.json(err);
        }
        res.json("object removed");

    })
})

app.get("/user/update", function(req, res){
    Comic.findOneAndUpdate({_id: ""}, {price: "newprice"}, function(err, data){
    if(err){
        res.json(err);
    }
        res.json(data);
});
});

app.listen(8080, function(){
        console.log("server running on:localhost:8080");
});

