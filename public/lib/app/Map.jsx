/**
 * @jsx React.DOM
 */

var Map = React.createClass({
  clusterLayer: new L.FeatureGroup(),
  imageLayer: new L.FeatureGroup(),
  getDefaultProps: function(){
    return {
      lat: 37.8043,
      lng: -122.3952
    }
  },
  getInitialState: function(){
    return {scrollPositionLeft: 0}
  },
  componentWillReceiveProps: function(nextProps){
    if(nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng || nextProps.zoom !== this.props.zoom ){
      this.map.setView(new L.LatLng(nextProps.lat, nextProps.lng), nextProps.zoom)
    }
  },
  componentDidMount: function(){

    var lat = this.props.lat
    var lng = this.props.lng
    // var attrOptions = {
    //   position: "bottomright"
    // }
    // var attribution = new L.control.attribution(attrOptions)

    this.map = new L.Map(this.refs.leafletTarget.getDOMNode(), {
        layers: [],
        center: new L.LatLng(lat, lng),
        zoom: 13,
        minZoom: 10,
        maxBounds:[[-85,-180.0],[85,180.0]],
        zoomControl: false,
        markerZoomAnimation: false,
        fadeAnimation: false,
        boxZoom: true
      }
    );

    this.backgroundTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/tokugawa.n9764446/{z}/{x}/{y}.png', {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    }) // Mapbox map tiles

    this.map.addLayer(this.backgroundTiles);
    this.map.addLayer(this.imageLayer);
    this.map.addLayer(this.clusterLayer);
    var me = this

    $(window).scroll(function () {
      var scrollPositionLeft = $(window).scrollLeft();
      me.setState({scrollPositionLeft: scrollPositionLeft})
    });


  },
  render: function(){
    var scrollOffsetLeft = this.state.scrollPositionLeft

    var mapStyling = {
        left: scrollOffsetLeft,
        top: 0,
        bottom: 0,
        right: -scrollOffsetLeft,
        position: 'absolute',
        backgroundColor: "f1f1f1"
      }

    return (
      <div className="container">
        <div ref='leafletTarget' id="map" style={mapStyling}>
        </div>
      </div>
      )
  }
})