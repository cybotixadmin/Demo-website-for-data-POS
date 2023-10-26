
const express = require('express');

const fs = require('fs');
const http = require('http');
// Read the configuration file once and store the data in memory
const configFile = fs.readFileSync('./config.json');
const config = JSON.parse(configFile);

module.exports = function (app) {

    app.get('/test1/', function (req, res) {
        //...
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
        console.log("querydata_response_page");

        try {
            // access the data access token from the header
            const platformtoken = req.get('X_HTTP_CYBOTIX_DATA_ACCESSTOKEN');
            console.log("platformtoken: " + platformtoken);

            // parse it and dsiplay the contents.


            const datarequest = req.get('X_HTTP_CYBOTIX_DATA_REQUEST');
            console.log("datarequest: " + datarequest);

            //res.status(200);
            //res.send(querydata_response_page);


            // Splitting the JWT to get the header, payload, and signature
            const[header, load, signature] = platformtoken.replace(/-/g, '+').replace(/_/g, '/').split('.');
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
            const data_grant = JSON.parse(base642str(parsedPayload.grant));
            console.log(data_grant);
            console.log("data grant subject");
            console.log(data_grant.data_subject);
            console.log("data grant req");
            console.log(data_grant.grants);

            var location = parsedPayload.aud;
            console.log("location: " + location);
            res.render('display_dataaccesstoken', {
                token: platformtoken,
                decodedHeader: decodedHeader,
                parsedPayload: parsedPayload,
                datagrant_subject: data_grant.data_subject,
                datagrant_requests: data_grant.grants,
                signature: signature,
                publicKey: config.signature_validation_key
            });
            const options = {
                hostname: 'localhost',
                path: '/data',
                port: 3000,
                method: 'GET',
                headers: {
                    'X_HTTP_CYBOTIX_DATA_ACCESSTOKEN': platformtoken,
                    'User-Agent': 'Node.js/14.0', // Just an example User-Agent header
                    'X_HTTP_CYBOTIX_DATA_REQUEST': datarequest
                }
            };

            http.get(options, (res) => {
                let data = '';

                // A chunk of data has been received.
                res.on('data', (chunk) => {
                    data += chunk;
                    console.log(data);

                });
                // The whole response has been received. Print out the result.
                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(data);
                        console.log(parsedData);
                    } catch (e) {
                        console.error("Error parsing the response data:", e.message);
                    }
                });
                console.log("data read back from server");

            }).on("error", (err) => {
                console.error("Error making the request:", err.message);
            });

        } catch (e) {
            console.error(e);
        }
    });

}

function base642str(data) {
    let buff = new Buffer(data, 'base64');
    let text = buff.toString('ascii');
    return text;
}
