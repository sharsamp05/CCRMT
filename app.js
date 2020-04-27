/* Main script for node - Express */

//Require Express and use
var express = require("express");
var app = express();

//Setting up ejs as the default viewer engine
app.set("view engine","ejs");

//Requiring Request for http
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const request = require('request');

var parseString = require('xml2js').parseString;
var xml;

//Initializing body parser
//var bodyParser = require("body-parser");
//app.use(bodyParser.urlencoded({extended:true}));

//Requireing node-ssh
var node_ssh, ssh

node_ssh = require('node-ssh');
ssh = new node_ssh();


/* All Routes */

var httpdetails=[];
var sshdetails=[];


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

//Route to CMS OverView
app.get("/resources/cms/overview",function(req,res){

    request('https://10.106.102.205:446/api/v1/system/status', function (error, response, body) {
    
        console.error('error:', error); // Print the error if one occurred
        httpdetails.error = error;
        httpdetails.statusCode = response && response.statusCode;
        httpdetails.body = body;

        xml = httpdetails.body;
        console.log(xml);
        parseString(xml, function (err, result) {
            httpdetails.body=JSON.stringify(result);
            httpdetails.body=JSON.parse(httpdetails.body)
            console.log(httpdetails.body);
        });

        ssh.connect({
            host: '10.106.102.205',
            username: 'cmsadmin',
            password: 'c1sc0SS+987'
            }).then(() => ssh.exec('hostname').then(function(result){
            sshdetails.hostname= result;
            res.render('cmsoverview', {httpdetails:httpdetails,sshdetails:sshdetails});
            }))

    }).auth('cmsadmin','c1sc0SS+987');
});


//Route to CMS Alarms and Status
app.get("/resources/cms/status",function(req,res){

    request('https://10.106.102.205:446/api/v1/system/alarms', function (error, response, body) {
    
        console.error('error:', error); // Print the error if one occurred
        httpdetails.error = error;
        httpdetails.statusCode = response && response.statusCode;
        httpdetails.body = body;

        xml = httpdetails.body;
        parseString(xml, function (err, result) {
            httpdetails.body=JSON.stringify(result);
            console.log(httpdetails.body);
            httpdetails.body=JSON.parse(httpdetails.body);
            res.render('cmsstatus', {httpdetails:httpdetails});      
        });
    }).auth('cmsadmin','c1sc0SS+987');
});


//Route to CMS Calls
app.get("/resources/cms/calls",function(req,res){

    request('https://10.106.102.205:446/api/v1/calls?', function (error, response, body) {
    
        console.error('error:', error); // Print the error if one occurred
        httpdetails.error = error;
        httpdetails.statusCode = response && response.statusCode;
        httpdetails.body = body;

        xml = httpdetails.body;
        parseString(xml, function (err, result) {
            httpdetails.body=JSON.stringify(result);
            console.log(httpdetails.body);
            httpdetails.body=JSON.parse(httpdetails.body);
            //console.log(httpdetails.body);
            res.render('cmscalls', {httpdetails:httpdetails});      
        });
    }).auth('cmsadmin','c1sc0SS+987');
});

//Route to VCS Calls
app.get("/resources/vcs/calls",function(req,res){

    request('https://10.127.232.196/api/management/status/call/call/active/false', function (error, response, body) {
    
        console.error('error:', error); // Print the error if one occurred
        httpdetails.error = error;
        httpdetails.statusCode = response && response.statusCode;
        httpdetails.body = body;
        xml = httpdetails.body;
        httpdetails.body = JSON.parse(xml);
        res.render('vcs_calls', {httpdetails:httpdetails}); 
    }).auth('admin','Csco@048');
});


//Route to CMS ssh
/*app.get("/resources/cms/ssh",function(req,res){

    ssh.connect({
    host: '10.106.102.205',
    username: 'cmsadmin',
    password: 'c1sc0SS+987'
    }).then(() => ssh.exec('version').then(function(result){
    console.log('STDOUT: ' + result);
    sshdetails.result= result;
    res.render("cmsssh", {sshdetails:sshdetails});
    }))
    
});*/

// / route sending to /resource
app.get("/",function(req,res){
    res.redirect("/resources")
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});