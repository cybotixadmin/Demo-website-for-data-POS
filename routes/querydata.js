


module.exports = function(app){

  app.get('/test1/', function(req, res){
        //...
   });


   /**
    * this page contains a trigger that launches a data request to the user.
    */

  
const query_data_page='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>query data</title></head><body><iframe src="/querydata_redirect_page?redirect=http%3A%2F%2Flocalhost%3A3001%2Fquery_redirect_page2" height="400" width="200" title="redirect"></iframe>     <div id="mydiv">     <b>Hello, platform! </b> </div>  </body></html>';

app.get('/trigger_data_query', (req, res) => {
    res.status(200)
  res.send(query_data_page);
});



const querydata_redirect_page='<!DOCTYPE html><html lang="en">query data page</html>';


/*
Send a request to the users browser to ask for their data.
The request will be picked up by the plugin and if there is an existing agreement in place, the plugin will return a data access token.

If there is no agreement, the plugin will promt the user to accept the agreement and then return a data access token.

If there is no plugin, nothing will happen.
 */

app.get('/querydata_redirect_page', (req, res) => {

 // attach the platform token to the response header. All request to the users must include the platform tkoken in the header.
  res.setHeader('X_HTTP_CYBOTIX_PLATFORM_TOKEN', 'eyJ0eXAiOiJqd3QiLCJhbGciOiJSUzI1NiJ9Cg.eyJpc3MiOiJodHRwczovL2N5Ym90aXgubm8iLCJzdWIiOiJodHRwczovL3d3dy52ZW5kb3IuY29tLyIsImF1ZCI6ImN5Ym90aXgtcGVyc29uYWwtZGF0YS1jb21tYW5kZXIiLCJleHAiOjE3MzU2ODk2MDAsIm5iZiI6MTU2Mzk4MDQwMCwiaWF0IjoxNTYzOTgwNDAwLCJqdGkiOiJmZmZmLWVlZWUtYWFhYS1iYmJiLWNjY2MiLCJ4NWMiOiJNSUlEWFRDQ0FrV2dBd0lCQWdJVUsxcU8zcjh3MWtQdzlsV2FGNHVuTVpjS2Fxb3dEUVlKS29aSWh2Y05BUUVMQlFBd1BqRUxNQWtHQTFVRUJoTUNWVk14R0RBV0JnTlZCQW9NRDAxNUlFOXlaMkZ1YVhwaGRHbHZiakVWTUJNR0ExVUVBd3dNYlhsa2IyMWhhVzR1WTI5dE1CNFhEVEl6TVRBeE1ESXlNVGcxTkZvWERUTXpNVEF3TnpJeU1UZzFORm93UGpFTE1Ba0dBMVVFQmhNQ1ZWTXhHREFXQmdOVkJBb01EMDE1SUU5eVoyRnVhWHBoZEdsdmJqRVZNQk1HQTFVRUF3d01iWGxrYjIxaGFXNHVZMjl0TUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFyWmdXQ0NoRk1waTZGVklIWnM2eUdNb0JmZDBDR3ZTNStiM2VMN2c3VjZiak0zV1hVVTdlS3g1WmU5Rm11U0RoQ09rZy9Nc3FJa1NFNW4rTFFaQlk4Vk1xM0NoWTRpeDdSRTh4YjFPY0ZZN3pmcEl0TWRmNWRHZUg2ZjU1NEZzYnMrVkcwclo2REJ2Lyt5amhWRUM3MmU4aDhERk1LOS9pVVFhQ0h6SmptTTU2bFBqeFl6WEtLOVcwMFcxd1V0ZGZMUlBWYTBmL1BhTktJMHhWMU1Mdi9DcFBOeURHQU1NeFNYenZEczR1MnNoNVFZUVc5aVJiWVp5bnZld3g2dzRNdUFtbjMvWmNOTmp3eGc0WkFTMTlNTTBUc0xaRVhIR3hNdk9kNlJJa0FuTDFIZXY1N3dVTHBZS2lMamlNczk4ZFNMS3hXaDUzWjR4emg4K1E4K1ltTVFJREFRQUJvMU13VVRBZEJnTlZIUTRFRmdRVWNlMlRDZHI0a3JwQ2RnUnl4dGV6QmF2SUtxSXdId1lEVlIwakJCZ3dGb0FVY2UyVENkcjRrcnBDZGdSeXh0ZXpCYXZJS3FJd0R3WURWUjBUQVFIL0JBVXdBd0VCL3pBTkJna3Foa2lHOXcwQkFRc0ZBQU9DQVFFQUwxMnNlVFNvUHVyN1liSGZQY1MvY1dpcTFiM3VZOW9pdHZVSVIyMkZkYUFBbnlWRWVtYmxxVnNTSG9SQ1NJaWF4MWVqaDEzQ3NjV0NtMTN5eXVOUG9FdmNWd0E3dUpZeWFkQitJblJaR3JrNjg4dGFrTmtCSng0MlpWWTJTb3krb2lFdStiZll4dFhZWm1ublErZ25sM1ZOR3RpdG90K2ZLNWJoaG1HbXd4SEVnMUJnV2dkOTVKdzd6WFVyaHpxcXp6SHhhTFJqOFFnMmVUdE9vakpqYWNFeGUrL0dVRkVTOWtSeWFjU2p3aTFCUXVaZXMrWk00QlAzQU1ueGs2WFp4Q0RTc216S3ZkQUNmMFpVU1poRmJWcFZUN3ZickluZjJma3JxN2xjOHRRZENKaDh2QXBJcnFYa1lUNkVudFlmSk9NR2tha0FwVysyWC9vZlB0b1BtUT09In0K.PI-05wqB8AuWfjGtckcXHca4jFCwrrkEZDHOLL15hbcx41KB9iSFwqBd0AQLtblqJRv3WbHsVm1ewBKXfuuc2c4nU6Ybx7BHJNNgffzPeTSCCuLuGQOo_e8e2mxgbQXXEqbH6pUQc2uVSi2untsA_b9Z_hf3dWtZw5GRqSLsZ3CQaKW9CCXTFXczE6KpojMg3iobuspTVi8v9Yo6XikBXVfD2qlD1pvSGAxzhI0PLaR7U4kI0RWvSM7NBuggTyaexVdT0v_ZgfJrPdX0jxJfjOpUW6AZDFdz88w6FlQvWd-iZU9uzut495rzedYe5jhHQhejA-oOKgn50jjYbPKUjw');

// Attach the token containing the data access agreement that the site would like to establish with the user
// this is not the data request itself. That request comes later, and must be a subset of what is allowed by this agreement. 
 // res.setHeader('X_HTTP_CYBOTIX_QUERY_DATAAGREEMENT', 'e3sidXVpZCI6IjEyMzQ1Njc4OTBxd2VydHl5dSIsIm5hbWUiOiIiLH19fX0=');

// URL to which the response will be sent. This need not be part of the users visible site-navigation but rather take place in the background. 
  res.setHeader('X_HTTP_CYBOTIX_QUERY_REDIRECT', '/querydata_response_page');
  // the data request message
  // echo '{"messagetext":"Can we see \nyour click history for the past hour?","requests":[{"requesttype":"clickhistory", "requestdetails":{"time":"now - 1hr","filter":".*top.*"}},{"requesttype":"clickhistory", "requestdetails":{"time":"now - 1hr","filter":".*top.*"}}]}' | base64 | tr -d '\n'

  res.setHeader('X_HTTP_CYBOTIX_DATA_REQUEST', 'eyJtZXNzYWdldGV4dCI6IkNhbiB3ZSBzZWUgXG55b3VyIGNsaWNrIGhpc3RvcnkgZm9yIHRoZSBwYXN0IGhvdXI/IiwicmVxdWVzdHMiOlt7InJlcXVlc3R0eXBlIjoiY2xpY2toaXN0b3J5IiwgInJlcXVlc3RkZXRhaWxzIjp7InRpbWUiOiJub3cgLSAxaHIiLCJmaWx0ZXIiOiIuKnRvcC4qIn19LHsicmVxdWVzdHR5cGUiOiJjbGlja2hpc3RvcnkiLCAicmVxdWVzdGRldGFpbHMiOnsidGltZSI6Im5vdyAtIDFociIsImZpbHRlciI6Ii4qdG9wLioifX1dfQo=');


  res.setHeader( 'Content-Type', 'text/html');

  
  res.status(200);
  res.send(querydata_redirect_page);
});


/*
page demonstrating accepting of the signed data access agreement being received back from the plugin.
Trigger the actal data request from this page
*/
const querydata_response_page='<!DOCTYPE html><html lang="en"><title>query data response page</title><body></body></html>';
app.get('/querydata_response_page', (req, res) => {

// check the received agreement and if it is valid, trigger the data request.



 // attach the platform token to the response header. All request to the users must include the platform tkoken in the header.
 res.setHeader('X_HTTP_CYBOTIX_PLATFORM_TOKEN', 'ZHVtbXkgdG9rZW4K');

 // Attach the token containing the data access request. 
   res.setHeader('X_HTTP_CYBOTIX_DATA_REQUEST', 'eyJtZXNzYWdldGV4dCI6IkNhbiB3ZSBzZWUgXG55b3VyIGNsaWNrIGhpc3RvcnkgZm9yIHRoZSBwYXN0IGhvdXI/IiwicmVxdWVzdHMiOlt7InJlcXVlc3R0eXBlIjoiY2xpY2toaXN0b3J5IiwgInJlcXVlc3RkZXRhaWxzIjp7InRpbWUiOiJub3cgLSAxaHIiLCJmaWx0ZXIiOiIuKnRvcC4qIn19LHsicmVxdWVzdHR5cGUiOiJjbGlja2hpc3RvcnkiLCAicmVxdWVzdGRldGFpbHMiOnsidGltZSI6Im5vdyAtIDFociIsImZpbHRlciI6Ii4qdG9wLioifX1dfQo=');
 
 // URL to which the data access token will be sent. Typically this will be at the same domain name as the site itself.

 // This token can be used to access the data for a limited time (specified inside).
 // The location where the data access token can be used is contained inside it. This data store can be anywhere. 
// The data access token is not stricktly a beaerer token since it can only be used in conjunction with the platform token. 
   res.setHeader('X_HTTP_CYBOTIX_QUERY_DATA_REDIRECT', '/querydata_response_page');
 
   res.setHeader( 'Content-Type', 'text/html');
 

 res.status(200);
  res.send(querydata_response_page);
});


}
