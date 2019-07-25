//jshint esversion:6

const express=require("express");

const bodyParser=require("body-parser");

const request = require("request");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extened:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){

   var currentDate = new Date();
    var crypto=req.body.crypto;
    var fait = req.body.fait;
    var qtt=req.body.qtt;
var price;
    var options ={
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: fait,
            amount: qtt
        }

    };
    request(options,function(error,response,body){

        var data=JSON.parse(body);
        price=data.price;

        res.write("<p style='text-align:center;margin-top:100px;'>Today is "+ currentDate+"<p>");

        res.write("<h1 style='text-align:center;'>The price of  "+ crypto +"  is  "+ price +"  "+fait +" <h1>");

        res.send();
    });



});
app.listen(2000|| process.env.PORT,function(){
    console.log("server is running 3k");
});
