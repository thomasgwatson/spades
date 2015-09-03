/**
 * @jsx React.DOM
 */

var HomePage = React.createClass({
  getInitialState: function() {
    return { image: this.props.backingImages[(Math.floor(Math.random() * 8))],
      offset: 0,
      bottom: -50,
      imageWidth: '100%',
      imageLoaded: false
    };
  },
  getDefaultProps: function(){
    return {
    }
  },
  componentDidMount: function() {
    var me = this
    $('#img').imagesLoaded(function() {
      me.scrollToCenter()
    });
  },
  componentWillReceiveProps: function(){
    this.scrollToCenter()
  },
  scrollToCenter: function(){
    var imageWidth = document.getElementById('img').offsetWidth
    var offSetRight = (imageWidth - document.documentElement.offsetWidth )/2
    this.setState({offSet: offSetRight, bottom: 10, imageWidth: imageWidth, imageLoaded: true})
  },
  rollDownToMap: function(evt){
    evt.preventDefault()
    var target = $('#map')
    $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
  },
  render: function(){
    var screeningPageStylings = {height: (this.state.imageLoaded ? "0%" : "100%"), width: (this.state.imageLoaded ? "100%" : "600%"), zIndex: 400, top: 0, bottom: 0, right: (-this.state.offset - 1000), left: this.state.offset, position: "absolute" }
    var screeningTextStylings = { textAlign: 'center', height: "100%", width: (this.state.imageLoaded ? "100%" : "150%"), zIndex: 401, top: 0, bottom: 0, position: 'absolute', color: "rgb(15,15,15)", fontFamily: "indie-font", fontSize: 50, right: -this.state.offset, left: this.state.offset}

    if(this.state.offSet){setTimeout(window.scrollTo(this.state.offSet, 0), 100);}

    return(
      <div className="container heighty">
        <div style={screeningPageStylings} className="background-color-woo click-thru">
        </div>
        <div style={screeningTextStylings} className="click-thru" >{this.state.imageLoaded ? " " : "Loading..."}
        </div>
        <img ref='img' id='img' src={'/images/backing/' + this.state.image} className="bg" />
        <div className='scrim' id='scrim' style={{width: this.state.imageWidth}}>
        </div>
        <div className='title-text' id='title-text' style={{left: this.state.offSet + 25 + 'px', bottom: 10}}>
          <span>Graffi.so</span>
        </div>
        <div className='blurb-text' id='blurb-text' style={{right: -this.state.offSet + 25 + 'px', bottom: this.state.bottom}}>
          <span>Street Art Discovery Engine</span>{" "}<span onClick={this.rollDownToMap} className="fa fa-chevron-circle-down" id="arrow"></span>
        </div>
      </div>
      )
  }
})
