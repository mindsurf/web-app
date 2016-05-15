module.exports = function(dataLayer,server,sessions){

    //client cookie session
    server.use(sessions({
      cookieName: 'session', // cookie name dictates the key name added to the request object
      secret: 'blargadeeblargblarg', // should be a large unguessable string
      duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // duration of the cookie in milliseconds, defaults to duration above
        ephemeral: false, // when true, cookie expires when the browser closes
        httpOnly: true // when true, cookie is not accessible from javascript
      }
    }));

    //services
    require('./routes/session')(dataLayer,server);
    require('./routes/index')(dataLayer,server);

    console.log("Web Service Layer Up");

    return this;
}
