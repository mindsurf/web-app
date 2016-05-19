import TopComponent from "./components/TopComponent.jsx"
import PicUploadComponent from "./components/PicUploadComponent.jsx";

var RegisterComponent = React.createClass({
  getInitialState: function(){
    return {
        genre:""
    }
  },

  register: function() {
    window.console.log("register");
    console.log(this.refs);

    //authorname
    var authorname= this.refs.authorname.value;
    /*if(!authorname)
    {
        this.refs.authorname.className= "require";
        var top = this.refs.authorname.offsetTop;
        window.scrollTo(0,top);
        return;
    }*/

    var birthday= this.refs.birthday.value || "";
    var genre= this.state.genre;
/*
    //pic
    var pic= this.refs.picUploadComponent.state.pic || "";
    window.console.log(pic)
    window.console.log(pic.length)
    if(pic)
      pic= LZString.compressToUTF16(pic);

    window.console.log(pic)
    window.console.log(pic.length)

    //
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
    });*/
  },
  maleGenre: function(){
    this.setState({genre:"M"});
  },
  femaleGenre: function(){
    this.setState({genre:"F"});
  },
  render: function() {
    var content = (
      <div>

        <div className="col-md-11 wellcome">
          Wellcome to MindSurf
          <div className="email">{window.session.email}</div>
        </div>

        <div className="col-md-6 profile">
          <table className="form"> <tbody>
            <tr>
              <th>Profile</th>
            </tr>
            <tr>
              <td>Author Name</td>
              <td><input type="text" ref="authorname" required
                  placeholder="This will be the default signature of your writtings" maxLength="45"/></td>
            </tr>
            <tr>
              <td>Genre</td>
              <td className="genre">
                <div className="col-md-12">
                  <div className={ this.state.genre=="M" ? "active" : ""} onClick={this.maleGenre}>Male</div>
                  <div className={this.state.genre=="F" ? "active" : ""} onClick={this.femaleGenre}>Female</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Birthday</td>
              <td><input type="text" ref="birthday" data-format="YYYY-MM-DD" data-template="D MMM YYYY" /></td>
            </tr>
            <tr>
              <td>Picture</td>
              <td><PicUploadComponent header="Profile Picture" glyphicon="user" ref="picUploadComponent"/></td>
            </tr>
          </tbody></table>
        </div>

        <div className="col-md-6 terms">
          <table className="form"> <tbody>
            <tr>
              <th>Terms & Conditions</th>
            </tr>
            <tr>
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
          </tbody></table>
        </div>

        <div className="form col-md-11">
            <button className="btn btn-default" onClick={this.register}>Create my account</button>
        </div>
      </div>);

    var callback = function(){
      navigator.id.logout();
    }

    return <TopComponent content={content} callback={callback}/>
  },
  componentDidMount: function(){
    $(this.refs.birthday).combodate({
          value: new Date(),
          minYear: new Date().getFullYear() - 110,
          maxYear: moment().format('YYYY')
    });
  }
});

ReactDOM.render(
  <RegisterComponent />,
  document.getElementById('content')
);
