module.exports = function(dataLayer,server){
    server.route('/')
        .get(function(req, res)
        {
            if(req.session.state == 'U')
                res.render('wrapper', { CONTROLLER:'index' , SESSION:req.session });
            else
                res.redirect('/overview');
        });

    server.route('/overview')
        .get(function(req, res)
        {
            if(req.session.state == 'V')
              req.session= new dataLayer.userModel();
            res.render('wrapper', { CONTROLLER:'overview' , SESSION:req.session });
        });

    server.route('/register')
        .get(function(req, res)
        {
            if(req.session.state == 'V')
                res.render('wrapper', { CONTROLLER:'register' , SESSION:req.session });
            else
              res.redirect('/');
        });

    return this;
}
