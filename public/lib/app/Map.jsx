/**
 * @jsx React.DOM
 */

var Map = React.createClass({
  heatLayer: new L.FeatureGroup(),
  markerLayer: new L.FeatureGroup(),
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

    if(nextProps.data){
      this.markerLayer.clearLayers()
      this.heatLayer.clearLayers()
      var heatData = this.buildHeatLayer(nextProps.data)
      // var markerData = this.buildMarkerLayer(nextProps.data)
      this.heatLayer.addLayer(heatData)
    }
  },
  buildMarkerLayer: function(data){

  },
  buildHeatLayer: function(data){
    var latlngs = []

    for (var i = 0; i < data.length; i++){
      var entry = data[i]
      latlngs.push(L.latLng(entry.lat, entry.lng))
    }
    return L.heatLayer(latlngs, {gradient: {0.3: "#FFD700", 0.4:"#34495e", 0.8: "#0AC899"}, blur:40});
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

    console.log(this.props.data)

    this.map.addLayer(this.backgroundTiles);
    this.map.addLayer(this.markerLayer);
    this.map.addLayer(this.heatLayer);
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