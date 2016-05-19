import TopComponent from "../components/TopComponent.jsx"

var PicUploadComponent = React.createClass({
    propTypes: {
      header: React.PropTypes.string,
      glyphicon: React.PropTypes.string
    },

    getDefaultProps: function() {
      return {
        header:"Upload a picture",
        glyphicon: "picture"
      };
    },

    getInitialState: function(){
      navigator._getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      window._URL = window.URL || window.webkitURL;

      return {
          render:"all",
          dragndrop:true,
          cam:!!navigator._getUserMedia,
          file:true
      }
    },

    render: function() {
        return this["render_"+this.state.render]();
    },

    render_all: function() {
        return (
          <div id="PicUploadComponent">
              <div className="col-md-12 header">
                {this.props.header}
              </div>
              <div className="col-md-8 current-pic">
                  {
                    this.state.pic ?
                    <span className="img-wrapper"><img src={this.state.pic}></img></span> :
                    <span className="icon-wrapper"><span className={"glyphicon glyphicon-"+this.props.glyphicon} aria-hidden="true"></span></span>
                  }
              </div>
              <div className="col-md-4 options">
                  <div>
                      <span className="glyphicon glyphicon-import" aria-hidden="true"></span>
                        drag&drop
                  </div>
                  <div>
                      <span className="glyphicon glyphicon-folder-open" aria-hidden="true"></span>
                        select
                  </div>
                  <div onClick={this.initSnapshot}>
                      <span className="glyphicon glyphicon-camera" aria-hidden="true"></span>
                        snapshot
                  </div>
              </div>
          </div>
        );
    },

    render_cam: function() {
        var content = (
          <div id="PicUploadComponent">
              <div className="col-md-12 header">
                {this.props.header}
              </div>
              <div className="col-md-6 video-container">
                  <video ref="video" src={this.videoSrc} autoPlay onClick={this.captureSnapshot}></video>
                  <canvas ref="canvas" hidden></canvas>
                  <span className="glyphicon glyphicon-camera" onClick={this.captureSnapshot} aria-hidden="true"></span>
              </div>
              <table className="col-md-6 options-container">
                  <tbody>
                    <tr>
                      <td>
                        <img ref="img-0" onClick={this.selectSnapshot}></img>
                      </td>
                      <td>
                        <img ref="img-1" onClick={this.selectSnapshot}></img>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img ref="img-2" onClick={this.selectSnapshot}></img>
                      </td>
                      <td>
                        <img ref="img-3" onClick={this.selectSnapshot}></img>
                      </td>
                    </tr>
                  </tbody>
              </table>

          </div>
        );

        var _t= this;
        var callback = function(){
          _t.setState({render:"all"});
        };

        return <TopComponent content={content} callback={callback} />
    },

    initSnapshot: function() {
        if(this.refs.video)
        {
            this.refs.video.play();
            this.setState({render:"cam"});
        }
        else
        {
              var _t= this;
              navigator._getUserMedia(
                {
                  "video": true
                },
                function(stream){
                  _t.videoSrc= window._URL.createObjectURL(stream);
                  _t.setState({render:"cam"});
                },
                function(error) {
                  window.console.log("Video capture error: ", error.code);
                  _t.setState({cam:false});
                }
              );
        }

    },

    captureSnapshot: function() {
      var refs = this.refs;
      var w= refs.video.videoWidth;
      var h= refs.video.videoHeight;

      var MAX= 400;
      if(w>MAX)
      {
        h= (h*MAX)/w;
        w= MAX;
      }
      else if(h>MAX)
      {
        w= (w*MAX)/h;
        h= MAX;
      }

      refs.canvas.setAttribute('width', w);
      refs.canvas.setAttribute('height', h);

      for(let i=0; i<4; i++)
        setTimeout(function(){
          refs.canvas.getContext("2d").drawImage(refs.video, 0, 0, w, h);
          refs["img-"+ i ].src= refs.canvas.toDataURL("image/jpeg");
        }, 500*i);
    },

    selectSnapshot: function(e) {
        this.setState({render:"all", pic:e.target.src })
    }
});

export default PicUploadComponent;
