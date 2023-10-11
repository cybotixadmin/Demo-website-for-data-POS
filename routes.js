module.exports = function (app) {
   
    

    app.get('/about', (req, res) => {
        res.send('About page');
    });

};
