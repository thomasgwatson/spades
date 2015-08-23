/**
 * @jsx React.DOM
 */

var HomePage = React.createClass({
  getInitialState: function() {
    return { image: this.props.backingImages[(Math.floor(Math.random() * 8))],
      offset: 0,
      bottom: -50
    };
  },
  getDefaultProps: function(){
    return {
    }
  },
  componentDidMount: function() {
    var me = this
    var scrollToCenter = function(){
      var offSetRight = (document.getElementById('img').offsetWidth - document.documentElement.offsetWidth )/2
      window.scrollTo(offSetRight, 0);
      me.setState({offset: offSetRight, bottom: 30})
    }
    window.setTimeout( scrollToCenter, 100)

  },
  render: function(){
    return(
      <div className="outer-image">
        <img ref='img' id='img' src={'/images/backing/' + this.state.image} className="bg" />
        <div className='title-text' id='title-text' style={{left: this.state.offset + 50 + 'px'}}>
          <span>Graffi.so</span>
        </div>
        <div className='blurb-text' id='blurb-text' style={{right: -this.state.offset + 50 + 'px', bottom: this.state.bottom}}>
          <span>Street Art Discovery Engine</span>
        </div>
      </div>
      )
  }
})
