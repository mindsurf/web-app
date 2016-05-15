module.exports = function(dataLayer,server){
    server.use(function (req, res, next)
    {
        if(!req.session.mode)
            req.session= new dataLayer.sessionModel(false,"visitor");
        next();
    });

    return this;
}
