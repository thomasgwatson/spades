/**
 * @jsx React.DOM
 */

var HomePage = React.createClass({
  getInitialState: function() {
    return { image: this.props.backingImages[(Math.floor(Math.random() * 8))]
    };
  },
  getDefaultProps: function(){
    return {
    }
  },
  componentDidMount: function() {
    var scrollToCenter = function(){
      console.log(document.body.offsetWidth, document.documentElement.offsetWidth, document.getElementById('img').offsetWidth)

      window.scrollTo((document.getElementById('img').offsetWidth - document.documentElement.offsetWidth )/2, 0);

    }
    window.setTimeout( scrollToCenter, 100)

  },
  render: function(){
    return(
      <div className="outer-image">
        <img ref='img' id='img' src={'/images/backing/' + this.state.image} className="bg" />
      </div>
      )
  }
})
