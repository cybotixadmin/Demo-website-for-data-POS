const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
// Read the configuration file once and store the data in memory
const configFile = fs.readFileSync('./config.json');
const config = JSON.parse(configFile);

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function (app) {

       /** create data request token */
       app.post('/gui_user_create_custom_datarequest', urlencodedParser,(req, res) => {
        try{
        console.log('/gui_user_create_custom_datarequest');
        console.log(req.method);
        console.log(req.rawHeaders);
        console.log("\n\nreq.body");
        console.log(req.body);

        console.log("dataaccessrequest");
        console.log(req.body.dataaccessrequest);
        var dr = req.body.dataaccessrequest;
        console.log(dr);
        console.log("dr");
        console.log(dr.replace(/[\r\n]/g, ""));
        console.log("dr2");
        console.log(JSON.parse(dr.replace(/[\r\n]/g, "")));
var dr_parsed = JSON.parse(dr.replace(/[\r\n]/g, ""));
        console.log("platformtoken");
        const platformtoken = req.body.platformtoken.replace(/[\r\n]/g, "").replace(/ /g, "");
        console.log("platformtoken: " + platformtoken);

        console.log("message");
        console.log(req.body.messagetext);

        // collect the information from the form


data_request_message = {
    messagetext: base64encode( req.body.messagetext),
    requests: dr_parsed
}
console.log("data_request_message");
console.log(data_request_message);
console.log("data_request_message-str");
console.log(JSON.stringify(data_request_message));


 // attach the platform token to the response header. All request to the users must include the platform tkoken in the header.
 res.setHeader('X_HTTP_CYBOTIX_PLATFORM_TOKEN', platformtoken);

 // Attach the token containing the data access agreement that the site would like to establish with the user
 // this is not the data request itself. That request comes later, and must be a subset of what is allowed by this agreement.
 // res.setHeader('X_HTTP_CYBOTIX_QUERY_DATAAGREEMENT', 'e3sidXVpZCI6IjEyMzQ1Njc4OTBxd2VydHl5dSIsIm5hbWUiOiIiLH19fX0=');

 // URL to which the response will be sent. This need not be part of the users visible site-navigation but rather take place in the background.
 res.setHeader('X_HTTP_CYBOTIX_QUERY_REDIRECT', '/querydata_response_page');
 // the data request message
 // echo '{"messagetext":"Can we see \nyour click history for the past hour?","requests":[{"requesttype":"clickhistory", "requestdetails":{"time":"now - 1hr","filter":".*top.*"}},{"requesttype":"clickhistory", "requestdetails":{"time":"now - 1hr","filter":".*top.*"}}]}' | base64 | tr -d '\n'

 res.setHeader('X_HTTP_CYBOTIX_DATA_REQUEST', base64encode(JSON.stringify(data_request_message)));

 res.setHeader('Content-Type', 'text/html');

 res.status(200);
 res.send(querydata_redirect_page);


        } catch (err) {
            console.log(err);
        }

    });

    const querydata_redirect_page = '<!DOCTYPE html><html lang="en">query data page</html>';

    /*
    Send a request to the users browser to ask for their data.
    The request will be picked up by the plugin and if there is an existing agreement in place, the plugin will return a data access token.

    If there is no agreement, the plugin will promt the user to accept the agreement and then return a data access token.

    If there is no plugin, nothing will happen.
     */

    app.get('/querydata_redirect_page', (req, res) => {

        // attach the platform token to the response header. All request to the users must include the platform tkoken in the header.
        res.setHeader('X_HTTP_CYBOTIX_PLATFORM_TOKEN', 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9hcGktZGV2LmN5Ym90aXgubm8iLCJzdWIiOiJjb3JwIGluYyIsImF1ZCI6IkN5Ym90aXgiLCJrZXkiOlsiLS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS1cclxuTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFwVElCM1Z0VmhDTUFKZ1hlZlc1T1xyXG4wNk4zVU5YY0VqSzNYYTNSd0Z1UDU2eDRTc2h5b05CVDFzOWtaY09wTGI5Wm5zWWxhMlVFYlRVSmpRT091T1JhXHJcbmFYT3hEbHF0ekVYc1BienNxTkhJRTZBVm1RTWFYK041VnlBVjBFM3IwaHNUL2lGUmJ5VXZSWTRGanpHMTdKeWVcclxuU0U2aWpveHpGNVpSN1RMdzgxZm1KUFIreTdFamtKQWEvNG54NWNEa3ZlNFdhZ0YyVVFlV3NzVG52RjlQUHNHelxyXG5RaktJZEpNYTdXbzF5RWJKSW5oUGUzWVNvOER4bnd0RzRHMnFYR29KK1FmeXRpTW1BeDZwL2puNW9vUCtzaWoxXHJcbmRydHRsS3BNRWg4WmtQZnpnNTNQYWt4OFdvOWpxWmNjOU1wYTZueVo4WmEwOVdWMWFyMzRhTXNPQ2JLdGFPSjZcclxuR1FJREFRQUJcclxuLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tXHJcbiJdLCJqdGkiOiJhOTRhMzFkOC0wMDA5LTQwMzMtYTUwZi1kMWM3ZWUzYWU1OTAiLCJpYXQiOjE2OTgyNjM4NjUsIm5iZiI6MTY5ODI2Mzg2NSwiZXhwIjoxNzAwODU1ODY1fQ.B2SfzzvvJlqAKXFTuyy1FXwXWH9JPRJgFPCJ441vHw2JBnSDJApDtuE-ZzV2hPECjgEld58V-cgEmVXwq8oB8A');

        // Attach the token containing the data access agreement that the site would like to establish with the user
        // this is not the data request itself. That request comes later, and must be a subset of what is allowed by this agreement.
        // res.setHeader('X_HTTP_CYBOTIX_QUERY_DATAAGREEMENT', 'e3sidXVpZCI6IjEyMzQ1Njc4OTBxd2VydHl5dSIsIm5hbWUiOiIiLH19fX0=');

        // URL to which the response will be sent. This need not be part of the users visible site-navigation but rather take place in the background.
        res.setHeader('X_HTTP_CYBOTIX_QUERY_REDIRECT', '/querydata_response_page');
        // the data request message
        // echo '{"messagetext":"Can we see \nyour click history for the past hour?","requests":[{"requesttype":"clickhistory", "requestdetails":{"time":"now - 1hr","filter":".*top.*"}},{"requesttype":"clickhistory", "requestdetails":{"time":"now - 1hr","filter":".*top.*"}}]}' | base64 | tr -d '\n'

        res.setHeader('X_HTTP_CYBOTIX_DATA_REQUEST', 'eyJtZXNzYWdldGV4dCI6IlEyRnVJSGRsSUhObFpTQmNibmx2ZFhJZ1kyeHBZMnNnYUdsemRHOXllU0JtYjNJZ2RHaGxJSEJoYzNRZ2FHOTFjajhLIiwicmVxdWVzdHMiOlt7InJlcXVlc3R0eXBlIjoiY2xpY2toaXN0b3J5IiwicmVxdWVzdGRldGFpbHMiOnsidGltZSI6Im5vdy0xaHIiLCJmaWx0ZXIiOiIuKnRvcC4qIn19LHsicmVxdWVzdHR5cGUiOiJjbGlja2hpc3RvcnkiLCJyZXF1ZXN0ZGV0YWlscyI6eyJ0aW1lIjoibm93LTFociIsImZpbHRlciI6Ii4qdG9wLioifX1dfQo=');

        res.setHeader('Content-Type', 'text/html');

        res.status(200);
        res.send(querydata_redirect_page);
    });

    /*
    page demonstrating accepting of the signed data access token being received back from the plugin.
    Trigger the actal data request from this page
     */
    const querydata_response_page = '<!DOCTYPE html><html lang="en"><title>data access token was received</title><body></body></html>';
    app.get('/querydata_response_page', (req, res) => {
        console.log("/querydata_response_page begin");

        try {

            const platformtoken = req.get('X_HTTP_CYBOTIX_PLATFORM_TOKEN');

            console.log("platformtoken: " + platformtoken);

            // access the data
            
            const datatoken = req.get('X_HTTP_CYBOTIX_DATA_ACCESSTOKEN');
            console.log("datatoken: " + datatoken);

            // parse it and dsiplay the contents.


            const datarequest = req.get('X_HTTP_CYBOTIX_DATA_REQUEST');
            console.log("datarequest: " + datarequest);

            //res.status(200);
            //res.send(querydata_response_page);


            // Splitting the JWT to get the header, payload, and signature
            const[header, load, signature] = datatoken.replace(/-/g, '+').replace(/_/g, '/').split('.');
            console.log("header: " + header);
            console.log("load: " + load);
            console.log("signature: " + signature);
            // Base64-decoding the header and payload for display
            const decodedHeader = Buffer.from(header, 'base64').toString();
            console.log("decodedHeader: " + decodedHeader);
            const decodedPayload = Buffer.from(load, 'base64').toString();
            console.log("decodedPayload: " + decodedPayload);
            console.log("render");

            const parsedPayload = JSON.parse(decodedPayload);

            console.log("parsedPayload");
            console.log(parsedPayload);
            console.log(parsedPayload.aud);

            // then use it to make a request to the remote website
            // and display the results
            console.log("data grant");
            const data_grant = JSON.parse(base64decode(parsedPayload.grant));
            console.log(data_grant);
            console.log("data grant subject");
            console.log(data_grant.data_subject);
            console.log("data grant req");
            console.log(data_grant.grants);

            const data_location_url = parsedPayload.aud;
            console.log("data_location_url: " + data_location_url);
        // create output objects

            console.log(splitUrl(data_location_url));
const endpoint = splitUrl(data_location_url);

            const options = {
                hostname: endpoint.domain,
                path: endpoint.path,
                port: endpoint.port,
                method: 'GET',
                headers: {
                    'X_HTTP_CYBOTIX_DATA_ACCESSTOKEN': datatoken,
                    'User-Agent': 'Node.js/14.0', 
                    'X_HTTP_CYBOTIX_PLATFORM_TOKEN': platformtoken,
                    'X_HTTP_CYBOTIX_DATA_REQUEST': datarequest
                }
            };
            console.log("make call to " );
console.log(options);
const regexp_http = new RegExp('^http');
const regexp_https = new RegExp('https://');
console.log((regexp_http.test(data_location_url)));
console.log((regexp_https.test(data_location_url)));

if (regexp_http.test(data_location_url)) {
    console.log("http url");



            http.get(options, (data_res) => {
                let data = '';

                // A chunk of data has been received.
                data_res.on('data', (chunk) => {
                    data += chunk;
                    console.log(data);

                });
                // The whole response has been received. Print out the result.
                var parsedData;
                data_res.on('end', () => {
                    try {
                        parsedData = JSON.parse(data);
                        console.log(parsedData);
                    } catch (e) {
                        console.error("Error parsing the response data:", e.message);
                    }
                    console.log("######");
                    console.log(   parsedData)
                        res.render('display_dataaccesstoken', {
                token: platformtoken,
                decodedHeader: decodedHeader,
                parsedPayload: parsedPayload,
                datagrant_subject: data_grant.data_subject,
                datagrant_requests: data_grant.grants,
                signature: signature,
                publicKey: config.signature_validation_key,
                data: parsedData
            });
                    console.log("data read back from server");

                });
                console.log("end");

            }).on("error", (err) => {
                console.error("Error making the request:", err.message);
            });

        }else{
            console.log("https url");
        }
        


        } catch (e) {
            console.error(e);
        }
    });

}


function base64decode(data) {
    return atob(data);
  }


function base64encode(str) {
    return btoa(str);
}


function splitUrl(url) {
    const regex = /^(https?):\/\/([^\/]+)(\/?.*)$/;
    const result = url.match(regex);

// is there a port number?
var port = 80;
var domain = result[2];
if (/:/.test(result[2])) {
console.log("port specified");
    var parts = result[2].split(':');
    var port = parts[1];
    var domain = parts[0];
    console.log("port: "+port);
}else{
    console.log("no port specified");
    if (/https/i.test(result[1])){
port = 443;

    }
}


    if (result) {
        return {
            protocol: result[1],
            domain: domain,
            port: port,
            path: result[3]
        };
    } else {
        throw new Error('Invalid URL');
    }
}

