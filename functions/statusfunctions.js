//Script to setup functions. Currently used to get status


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
                console.log(dbdetails.body);
                dbdetails.body = JSON.parse(dbdetails.body);
                resolve(dbdetails);
                });
            });
        });
    };



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
                console.log(httpdetails.body);
                httpdetails.body=JSON.parse(httpdetails.body);
                resolve(httpdetails);
            });
        });
    });
};

async function fetchAlarmAndStatus(res){
    username = 'cmsadmin';
    password = 'c1sc0SS+987';
    url = ['https://' + username + ':' + password + '@10.106.102.205:446/api/v1/system/alarms',
            'https://' + username + ':' + password + '@10.106.102.205:446/api/v1/system/database'];
    await fetchAlarmStatus();
    await fetchDbStatus();
    res.render('cmsstatus', { httpdetails: httpdetails, dbdetails: dbdetails });
};

module.exports = {
    fetchAlarmAndStatus : fetchAlarmAndStatus,
    fetchAlarmStatus : fetchAlarmStatus,
    fetchDbStatus : fetchDbStatus
};