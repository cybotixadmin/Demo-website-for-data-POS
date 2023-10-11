module.exports = function (app) {

    const platform_page = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">   <title>query</title></head><body  >    <div id="mydiv">    <div>   <b>Hello, platform! </b>   </div> </div>   </script></body></html>';

    // test the platform token
    app.get('/test_platform_token', (req, res) => {
        res.setHeader('X_HTTP_CYBOTIX_PLATFORM_TOKEN', 'ZHVtbXkgdG9rZW4K');
        res.setHeader('X_HTTP_CYBOTIX_REQUEST_TOKEN', 'ZHVtbXkgdG9rZW4K');

        res.send(platform_page);
    });

}
