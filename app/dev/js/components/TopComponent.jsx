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
          closed:false,
          zindex: 1000,
      }
    },

    render: function() {
        //if (this.state.closed)
        //return <span></span>;

        var zindex= this.state.zindex;
        var topComponents = $(".TopComponent");
        if(topComponents)
          zindex += topComponents.length;

        return (
          <div className="TopComponent" style={{zIndex:zindex}}>
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
