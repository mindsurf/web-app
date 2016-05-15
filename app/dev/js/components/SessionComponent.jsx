var SessionComponent = React.createClass({
    getInitialState: function() {
      return window.session;
    },

    render: function() {
        switch(window.session.mode)
        {
            case "user":
                return (
                  <div>
                  </div>
                );

            case "visitor":
                if(window.session.user.email)
                    return (
                      <div className="panel panel-default">
                          <div className="panel-body">
                              <div>
                                  <div className="col-md-12">
                                      <span className="action-1" onClick={this.foldMenu} ref="email">
                                        {window.session.user.email}
                                        <span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
                                      </span>
                                  </div>
                                  <div className="col-md-12 menu-item menu-item-1" ref="register">
                                      <span onClick={this.goRegister}>REGISTER</span>
                                  </div>
                                  <div className="col-md-12 menu-item menu-item-2" ref="logout">
                                      <span onClick={this.logout}>LOGOUT</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                    );
                else
                    return (
                      <div className="panel panel-default">
                          <div className="panel-body">
                              <div>
                                  <div className="col-md-12">
                                      <span className="action-1" onClick={this.login}>LOGIN / REGISTER</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                    );
        }
    },

    componentDidMount: function() {
        $(this.refs.register).hide();
        $(this.refs.logout).hide();
    },

    componentDidUpdate: function(prevProps, prevState) {
        $(this.refs.register).hide();
        $(this.refs.logout).hide();
    },

    foldMenu: function() {
        if($(this.refs.register).is(":visible"))
        {
            $(this.refs.register).hide();
            $(this.refs.logout).hide();
        }
        else
        {
            $(this.refs.register).show();
            $(this.refs.logout).show();
        }
    },

    login: function() {
        navigator.id.request();
        //watch
    },

    logout: function() {
        navigator.id.logout();
    },

    goRegister: function() {
        window.location= "/register"
    }
});

export default SessionComponent;
