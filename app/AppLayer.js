module.exports = function(server,path,serveStatic){

    //view engine
    server.set('views', __dirname);
    server.set('view engine', 'ejs');

    //static
    server.use(serveStatic(__dirname + '/public'));
    //server.use(serveStatic(__dirname + '/views/public'));

    console.log("App Layer Up");
    return this;
}
