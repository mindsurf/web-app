var HeaderComponent = React.createClass({
    render: function() {
      return (
        <div className="panel panel-default">
            <div className="panel-body">
                <span className="copo" onClick={this.goHome}></span>
                <span className="title" onClick={this.goHome}>MINDSURF</span>
            </div>
        </div>
      );
    },

    goHome: function() {
        window.location= "/";
    }
});

export default HeaderComponent;
