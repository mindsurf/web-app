module.exports = function(dataLayer,server){
    server.use(function (req, res, next)
    {
        if(!req.session.state)
            req.session= new dataLayer.userModel();
        next();
    });

    return this;
}
