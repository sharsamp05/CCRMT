/* Main script for node - Express */

//Require Express and use
var express = require("express");
var app = express();

//Setting up ejs as the default viewer engine
app.set("view engine","ejs");

//Requiring Request for http
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const request = require('request');

//Initializing body parser
//var bodyParser = require("body-parser");
//app.use(bodyParser.urlencoded({extended:true}));

//Requireing node-ssh
var path, node_ssh, ssh, fs

node_ssh = require('node-ssh');
ssh = new node_ssh();


/* All Routes */

var bodydetail;
var statusCode;
var versiondet;

//Index Route
app.get("/resources",function(req,res){
    res.render("index");
});

//Route to VCS
app.get("/resources/vcs",function(req,res){
    res.render("vcs");
});

//Route to CMS
app.get("/resources/cms",function(req,res){
    res.render("cms");
});

//Route to CMS Active Calls
app.get("/resources/cms/activecalls",function(req,res){

    request('https://10.106.102.205:446/api/v1/system/status', function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.

        var errors = error;
        statusCode = response && response.statusCode;
        bodydetail = body;
        res.render('cmsactivecalls', {body:bodydetail, status:statusCode});

    }).auth('cmsadmin','c1sc0SS+987');
});


//Route to CMS ssh
app.get("/resources/cms/ssh",function(req,res){

    ssh.connect({
        host: '10.106.102.205',
        username: 'cmsadmin',
        password: 'c1sc0SS+987'
      }).then(() => ssh.exec('version').then(function(result){
        console.log('STDOUT: ' + result);
        versiondet= result;
        res.render("cmsssh", {version:versiondet});
      }))
    
    

});


// / route sending to /resource
app.get("/",function(req,res){
    res.redirect("/resources")
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});