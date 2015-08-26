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
    return {
      scrollPositionLeft: 0,
      data: false
    }
  },
  requestData: function(lat, lng){
    var me = this
    $.get("/api/data?lat=" + lat +"&lng=" + lng).done(
      function(data) {
        me.newData(data)
      }
    );
  },
  newData: function(data){
      // this.markerLayer.clearLayers()
      this.heatLayer.clearLayers()
      var heatData = this.buildHeatLayer(data)
      // var markerData = this.buildMarkerLayer(nextProps.data)
      this.heatLayer.addLayer(heatData)
  },
  componentWillReceiveProps: function(nextProps){
    if(nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng || nextProps.zoom !== this.props.zoom ){
      this.map.setView(new L.LatLng(nextProps.lat, nextProps.lng), nextProps.zoom)
      this.requestData(nextProps.lat, nextProps.lng)
    }

    // Only requestData if the lat and lng is sufficiently different
  },
  buildMarkerLayer: function(data){

  },
  buildHeatLayer: function(data){
    var latlngs = []

    for (var i = 0; i < data.length; i++){
      var entry = data[i]
      latlngs.push(L.latLng(entry.lat, entry.lng))
    }
    return L.heatLayer(latlngs, {gradient: {0.2: "#FFD700", 0.9:"#34495e"}, blur:20});
  },
  componentDidMount: function(){
    var me = this

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        // me.setState({lat: position.coords.latitude, lng: position.coords.longitude});
        me.map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), me.props.zoom)
      });
    }

    var lat = this.props.lat
    var lng = this.props.lng

    this.map = new L.Map(this.refs.leafletTarget.getDOMNode(), {
        layers: [],
        center: new L.LatLng(lat, lng),
        zoom: this.props.zoom,
        minZoom: 10,
        maxBounds:[[-85,-180.0],[85,180.0]],
        zoomControl: false,
        markerZoomAnimation: false,
        fadeAnimation: false,
        boxZoom: true
      }
    );

    this.requestData(lat,lng)

    this.backgroundTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/tokugawa.n9764446/{z}/{x}/{y}.png', {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    }) // Mapbox map tiles

    this.map.addLayer(this.backgroundTiles);
    this.map.addLayer(this.markerLayer);
    this.map.addLayer(this.heatLayer);

    $(window).scroll(function () {
      var scrollPositionLeft = $(window).scrollLeft();
      me.setState({scrollPositionLeft: scrollPositionLeft})
    });

    this.map.on('zoomend', this.updateZoom);
    this.map.on('moveend', this.updateCenter);

  },
  updateCenter: function(evt){
    if(evt){
      this.updateURL({
        center: this.map.getCenter(),
        zoom: this.map.getZoom()
      })
    }
  },
  updateZoom: function(evt){
    if(evt){
      this.updateURL({
        center: this.map.getCenter(),
        zoom: this.map.getZoom()
      })
    }
  },
  updateURL: function(options){

    var getParams = {};
    var getQuery = {
      zoom: options.zoom || this.map.getZoom(),
      lat: options.center.lat || this.map.getCenter().lat,
      lng: options.center.lng || this.map.getCenter().lng
    };
    this.props.transitionTo('/', getParams, getQuery);

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