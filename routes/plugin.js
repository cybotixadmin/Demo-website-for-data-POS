
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

module.exports = function (app) {

    //  app.get('/test1/', function(req, res){
    //...
    //   });

    //other routes..
    //}


    // test the query plugin token
    // Burry a call to a page that causes a redirect

    const query_page = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>query</title></head><body><iframe src="/queryplugin_redirect_page" height="400" width="200" title="redirect"></iframe>     <div id="mydiv">     <b>Hello, platform! </b> </div>  </body></html>';

    app.get('/queryplugin', (req, res) => {
        res.status(200)
        res.send(query_page);
    });
    //const query_redirect_page='<!DOCTYPE html><html lang="en"><meta http-equiv="Refresh" content="0; url="' + "'" + "http://localhost:3001/query_redirect_response_page" + "'"  +'" /></html>';

   
    //const query_redirect_page='<!DOCTYPE html><html lang="en"><script type="text/JavaScript">function Redirect() {window.location.replace("/query_redirect_response_page");}</script></html>';
    const query_redirect_page = '<!DOCTYPE html><html lang="en"><script type="text/javascript">window.location.href="/queryredirect_response_page";</script></html>';

    app.get('/queryplugin_redirect_page', (req, res) => {
        res.setHeader('X_HTTP_CYBOTIX_PLATFORM_TOKEN', 'ZHVtbXkgdG9rZW4K');
        res.setHeader('X_HTTP_CYBOTIX_QUERY_PLUGIN', 'e3sidXVpZCI6IjEyMzQ1Njc4OTBxd2VydHl5dSIsIm5hbWUiOiIiLH19fX0=');
        res.setHeader('X_HTTP_CYBOTIX_QUERY_REDIRECT', '/queryplugin_redirect_response_page');
        const filePath = path.join(__dirname, 'query_plugin.html');
        //   res.download(filePath, 'query_plugin.html', (err) => {
        //     if (err) {
        //        res.status(500).send('File could not be downloaded: ' + err);
        //      }
        //    });
        try{
        fs.readFile('./public/queryplugin.html', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        });
    } catch (err) {
        console.log(err);
    }
    });
    // the response will be an ackowldgemnent in the response header
    // X_HTTP_CYBOTIX_HAVE_PLUGIN: true
    const query_redirect_response_page = '<!DOCTYPE html><html lang="en">redirect response resented here</html>';

    app.get('/queryplugin_redirect_response_page', (req, res) => {
        res.status(200)
        res.send(query_redirect_response_page);
    });

    // Route to serve the text file
    app.get('/queryplugin.html', (req, res) => {
        res.setHeader('X_HTTP_CYBOTIX_QUERY_PLUGIN', 'e3sidXVpZCI6IjEyMzQ1Njc4OTBxd2VydHl5dSIsIm5hbWUiOiIiLH19fX0=');
        const filePath = path.join(__dirname, 'queryplugin.html');
        res.download(filePath, 'queryplugin.html', (err) => {
            if (err) {
                res.status(500).send('File could not be downloaded: ' + err);
            }
        });
    });

}
