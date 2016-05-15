/**
 * @class SessionServices
 * @param appUrl
 * @param servicesUrl
 **/

function SessionServices(appUrl, servicesUrl) {
    this.appUrl = appUrl;
    this.servicesUrl = servicesUrl;
}

/**
 * @method register
 * @param authorname
 * @param success_callback function(data)
 * @param error_callback function(message)
 **/
SessionServices.prototype.register = function (authorname, success_callback, error_callback)
{
    $.post( this.servicesUrl+"/user/register" , {authorname:authorname} ,
                success_callback , "json" )
                .fail(error_callback);
}

/**
 * @method login
 * @param assertion
 * @param success_callback function(data)
 * @param error_callback function()
 **/
SessionServices.prototype.login = function (assertion, success_callback, error_callback)
{
    $.post( this.servicesUrl+"/user/verify" , {assertion:assertion} ,
                success_callback , "json" )
                .fail(error_callback);
}

/**
 * @method logout
 * @param success_callback function(data)
 * @param error_callback function()
 **/
SessionServices.prototype.logout = function ( success_callback, error_callback)
{
    $.post( this.servicesUrl+"/user/logout" , {} ,
                success_callback , "json" )
                .fail(error_callback);
}

export default SessionServices;
