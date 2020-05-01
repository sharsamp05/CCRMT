/* Main script for node - Express */

//Import relavent js scripts to be used in app script

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

username='cmsadmin';
password='c1sc0SS+987'; 

var httpdetails= [];
var sshdetails=[];
var dbdetails=[]

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
    fetchCmsOverview(res);
});

<<<<<<< HEAD
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
=======
//Route to CMS Alarms and Status
app.get("/resources/cms/status",function(req,res) {
    fetchAlarmAndStatus(res);
>>>>>>> cbd8e42dbd919362e6ab76c833b89bb733eb819f
});


//Route to CMS Calls
app.get("/resources/cms/calls",function(req,res){
    fetchAllCalls(res);
});

// / route sending to /resource
app.get("/",function(req,res){
    res.redirect("/resources")
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//Function Definitions:


//API for DB Status
function fetchDbStatus() {
    return new Promise(function(resolve, reject) {
        request(url[1], function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            dbdetails.error = error;
            dbdetails.statusCode = response && response.statusCode;
            dbdetails.body = body;
            xml = dbdetails.body;
            parseString(xml, function (err, result) {
                dbdetails.body = JSON.stringify(result);
                dbdetails.body = JSON.parse(dbdetails.body);
                resolve(dbdetails);
                });
            });
        });
    };

//API for Alarms
function fetchAlarmStatus() {
    return new Promise(function(resolve, reject) {
        request(url[0], function (error, response, body) {
    
            console.error('error:', error); // Print the error if one occurred
            httpdetails.error = error;
            httpdetails.statusCode = response && response.statusCode;
            httpdetails.body = body;

            xml = httpdetails.body;
            parseString(xml, function (err, result) {
                httpdetails.body=JSON.stringify(result);
                httpdetails.body=JSON.parse(httpdetails.body);
                resolve(httpdetails);
            });
        });
    });
};

/*Async function to get the alarms, db and other status from CMS.
This will call other promises*/
async function fetchAlarmAndStatus(res){
    url = ['https://' + username + ':' + password + '@10.106.102.205:446/api/v1/system/alarms',
            'https://' + username + ':' + password + '@10.106.102.205:446/api/v1/system/database'];
    await fetchAlarmStatus();
    await fetchDbStatus();
    res.render('cmsstatus', { httpdetails: httpdetails, dbdetails: dbdetails });
};


function fetchAllCalls(res){
    url = 'https://' + username + ':' + password + '@10.106.102.205:446/api/v1/calls?';
    request(url, function (error, response, body) {    
        console.error('error:', error); // Print the error if one occurred
        httpdetails.error = error;
        httpdetails.statusCode = response && response.statusCode;
        httpdetails.body = body;
    
        xml = httpdetails.body;
        parseString(xml, function (err, result) {
            httpdetails.body=JSON.stringify(result);
            httpdetails.body=JSON.parse(httpdetails.body);
            res.render('cmscalls', {httpdetails:httpdetails});
        });
<<<<<<< HEAD
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
=======
    });    
};

function cmsOverviewApi(){
    return new Promise(function(resolve, reject) {
        request(url[0], function (error, response, body) {
        
            console.error('error:', error); // Print the error if one occurred
            httpdetails.error = error;
            httpdetails.statusCode = response && response.statusCode;
            httpdetails.body = body;

            xml = httpdetails.body;
            parseString(xml, function (err, result) {
                httpdetails.body=JSON.stringify(result);
                httpdetails.body=JSON.parse(httpdetails.body);
                resolve(httpdetails);
            });
        });
    });
};
>>>>>>> cbd8e42dbd919362e6ab76c833b89bb733eb819f

function cmsVersionSsh(){
    return new Promise(function(resolve, reject) {
        ssh.connect({
            host: '10.106.102.205',
            username: 'cmsadmin',
            password: 'c1sc0SS+987'
            }).then(() => ssh.exec('hostname').then(function(result){
            sshdetails.hostname= result;
            resolve(sshdetails);
        }));
    });
};

async function fetchCmsOverview(res){

    url =['https://' + username + ':' + password + '@10.106.102.205:446/api/v1/system/status'];
    await cmsOverviewApi();
    await cmsVersionSsh();
    res.render('cmsoverview', {httpdetails:httpdetails,sshdetails:sshdetails});
}