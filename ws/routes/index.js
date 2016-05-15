module.exports = function(dataLayer,server){
    server.route('/')
        .get(function(req, res)
        {
            if(req.session.user.id)
                res.render('wrapper', { CONTROLLER:'index' , SESSION:req.session });
            else
                res.redirect('/overview');
        });

    server.route('/overview')
        .get(function(req, res)
        {
            res.render('wrapper', { CONTROLLER:'index' , SESSION:req.session });
        });

    server.route('/register')
        .get(function(req, res)
        {
            //if attempt to register being registered, redirect
            if (req.session.user.authorname)
                res.redirect('/');
            //else, continue
            else
                res.render('wrapper', { CONTROLLER:'register' , SESSION:req.session });
        });

    return this;
}
