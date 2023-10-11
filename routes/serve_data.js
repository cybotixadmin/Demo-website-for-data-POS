


module.exports = function(app){

 


const serve_data_page='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>serve data</title></head><body><iframe src="/querydata_redirect_page?redirect=http%3A%2F%2Flocalhost%3A3001%2Fquery_redirect_page2" height="400" width="200" title="redirect"></iframe>     <div id="mydiv">     <b>Hello, platform! </b> </div>  </body></html>';


/*
User's data can be stored anywhere. This interface 
 */

app.get('/serve_data_page', (req, res) => {


  
  
 res.status(200);
  res.send('data');
});




}
