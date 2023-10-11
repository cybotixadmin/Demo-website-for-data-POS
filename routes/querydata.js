


module.exports = function(app){

  app.get('/test1/', function(req, res){
        //...
   });


const query_data_page='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>query data</title></head><body><iframe src="/querydata_redirect_page?redirect=http%3A%2F%2Flocalhost%3A3001%2Fquery_redirect_page2" height="400" width="200" title="redirect"></iframe>     <div id="mydiv">     <b>Hello, platform! </b> </div>  </body></html>';

app.get('/querydata', (req, res) => {
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
  res.setHeader('X_HTTP_CYBOTIX_PLATFORM_TOKEN', 'ZHVtbXkgdG9rZW4K');

// Attach the token containing the data access agreement that the site would like to establish with the user
// this is not the data request itself. That request comes later, and must be a subset of what is allowed by this agreement. 
  res.setHeader('X_HTTP_CYBOTIX_QUERY_DATAAGREEMENT', 'e3sidXVpZCI6IjEyMzQ1Njc4OTBxd2VydHl5dSIsIm5hbWUiOiIiLH19fX0=');

// URL to which the response will be sent. This need not be part of the users visible site-navigation but rather take place in the background. 
  res.setHeader('X_HTTP_CYBOTIX_QUERY_DATAAGREEMENT_REDIRECT', '/querydata_response_page');

  res.setHeader( 'Content-Type', 'text/html');

  
  res.status(200);
  res.send(querydata_redirect_page);
});


/*
page demonstrating accepting of the signed data access agreement being recieved back from the plugin.
Trigger the actal data request from this page
*/
const querydata_response_page='<!DOCTYPE html><html lang="en"><title>query data response page</title><body></body></html>';
app.get('/querydata_response_page', (req, res) => {

// check the received agreement and if it is valid, trigger the data request.



 // attach the platform token to the response header. All request to the users must include the platform tkoken in the header.
 res.setHeader('X_HTTP_CYBOTIX_PLATFORM_TOKEN', 'ZHVtbXkgdG9rZW4K');

 // Attach the token containing the data access request. 
   res.setHeader('X_HTTP_CYBOTIX_QUERY_DATA', 'e3sidXVpZCI6IjEyMzQ1Njc4OTBxd2VydHl5dSIsIm5hbWUiOiIiLH19fX0=');
 
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
