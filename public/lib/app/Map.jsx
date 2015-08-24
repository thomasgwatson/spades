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

    this.backgroundTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/tokugawa.iblnm3f7/{z}/{x}/{y}.png', {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    }) // Mapbox map tiles

    this.map.addLayer(this.backgroundTiles);
    this.map.addLayer(this.imageLayer);
    this.map.addLayer(this.clusterLayer);


  },
  render: function(){
    return (
      <div className="container">
        <div ref='leafletTarget' id="map">
        </div>
      </div>
      )
  }
})