import HeaderComponent from "./components/HeaderComponent.jsx";
import SessionServices from "./services/SessionServices.js";
import SessionComponent from "./components/SessionComponent.jsx";

window.appUrl = "http://192.168.0.6:80"; //"http://localhost:80";
window.servicesUrl = "http://192.168.0.6:3001"; //"http://localhost:3001";
window.console.log("Mindsurf");
window.console.log("App URL " + window.appUrl);
window.console.log("Services URL " + window.servicesUrl);

$.ajaxSetup({
      xhrFields: {
         withCredentials: true
      },
      crossDomain: true
  });

window.headerComponent= ReactDOM.render(
  <HeaderComponent />,
  document.getElementById("HeaderComponent")
);

window.sessionServices = new SessionServices(
  window.appUrl,
  window.servicesUrl);

window.sessionComponent= ReactDOM.render(
  <SessionComponent />,
  document.getElementById("SessionComponent")
);

navigator.id.watch({
    onlogin: function(assertion)
    {
        window.sessionServices.login(assertion, function(data){
            window.console.log("login data:");
            window.console.log(data);

            if(data.success)
            {
                console.log("You have been logged in.");
                if(data.redir)
                    window.location.assign(data.redir);
                else
                {
                    window.session= data.session;
                    window.sessionComponent.setState(data.session);
                }
            }
            else
                console.log("Error in login: "+data.message);


        }, function(error){
            console.log("Error in login service");
            console.log(error);
        });
    },

    onlogout: function()
    {
        window.sessionServices.logout( function(data){
            console.log("You have been logged out.");
            if(data.redir)
                window.location.assign(data.redir);
            else
            {
                window.session= data.session;
                window.sessionComponent.setState(data.session);
            }

        }, function(error){
            console.log("Error in logout service");
            console.log(error);
        });
    }
});
