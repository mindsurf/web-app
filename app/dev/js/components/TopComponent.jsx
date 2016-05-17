var TopComponent = React.createClass({
    propTypes: {
        content: React.PropTypes.element.isRequired,
        callback: React.PropTypes.func,
    },

    getDefaultProps: function() {
      return {
      };
    },

    getInitialState: function(){
      return {
          closed:false
      }
    },

    render: function() {
        if (this.state.closed)
          return <span></span>;


        return (
          <div id="TopComponent">
              <div className="close" onClick={this.close}>
                  <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>

              </div>
              <div className="front">
                  {this.props.content}
              </div>
          </div>
        );
    },

    close: function() {
        this.setState({closed:true});
        if(this.props.callback)
            this.props.callback();
    }
});

export default TopComponent;
