import HeaderComponent from "./components/HeaderComponent.jsx";
import PicUploadComponent from "./components/PicUploadComponent.jsx";

var RegisterComponent = React.createClass({
  register: function() {
    window.console.log("register")
    //authorname
    var authorname= this.refs.authorname.value;
    if(!authorname)
    {
        this.refs.authorname.className= "require";
        var top = this.refs.authorname.offsetTop;
        window.scrollTo(0,top);
        return;
    }

    //pic
    /*var pic= this.refs.picUploadComponent.state.pic || "";
    window.console.log(pic)
    window.console.log(pic.length)
    if(pic)
      pic= LZString.compressToUTF16(pic);

    window.console.log(pic)
    window.console.log(pic.length)*/

    window.sessionServices.register(authorname, function(data){
        if(data.success)
        {
            if(data.redir)
                window.location.assign(data.redir);
            else
                window.location.assign("/");
        }
        else
            console.log("Error in login: "+data.message);


    }, function(error){
        console.log("Error in login service");
        console.log(error);
    });
  },
  render: function() {
    return (
      <div>
          <div className="col-md-10 wellcome">
              <span>Wellcome {window.session.email}</span>
                <br/>
              <span>Complete your registration in MindSurf</span>
          </div>
          <div className="col-md-8">
              <table className="form"> <tbody>
                  <tr>
                    <td>Author Name</td>
                    <td><input type="text" ref="authorname" placeholder="This will be the default signature of your writtings" maxLength="45"/></td>
                  </tr>
                  <tr>
                    <td>Terms & Conditions</td>
                    <td> <p>
                    Terms and conditions. Terms and conditions. Terms and conditions. Terms and conditions.
                    Terms and conditions. Terms and conditions. Terms and conditions. Terms and conditions.
                    Terms and conditions. Terms and conditions. Terms and conditions. Terms and conditions.
                    Terms and conditions. Terms and conditions. Terms and conditions. Terms and conditions.
                    Terms and conditions. Terms and conditions. Terms and conditions. Terms and conditions.
                    Terms and conditions. Terms and conditions. Terms and conditions. Terms and conditions.
                    Terms and conditions. Terms and conditions. Terms and conditions. Terms and conditions.
                    Terms and conditions. Terms and conditions. Terms and conditions. Terms and conditions.
                    Terms and conditions. Terms and conditions. Terms and conditions. Terms and conditions.
                    Terms and conditions. Terms and conditions. Terms and conditions. Terms and conditions.
                    Terms and conditions. Terms and conditions. Terms and conditions. Terms and conditions.
                    Terms and conditions. Terms and conditions. Terms and conditions. Terms and conditions.
                    Terms and conditions. Terms and conditions. Terms and conditions. Terms and conditions.
                    Terms and conditions. Terms and conditions. Terms and conditions. Terms and conditions.
                    Terms and conditions. Terms and conditions. Terms and conditions. Terms and conditions.
                    </p> </td>
                  </tr>
              </tbody> </table>
          </div>
          <div className="col-md-4">
              <PicUploadComponent header="Profile Picture" glyphicon="user" ref="picUploadComponent"/>
          </div>
          <div className="col-md-8">
              <div className="form">
                  <button className="btn btn-default" onClick={this.register}>Create my account</button>
              </div>
          </div>
      </div>
    );
  }
});

window.headerComponent= ReactDOM.render(
  <HeaderComponent />,
  document.getElementById("HeaderComponent")
);

ReactDOM.render(
  <RegisterComponent />,
  document.getElementById('content')
);
