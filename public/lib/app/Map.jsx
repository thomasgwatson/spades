/**
 * @jsx React.DOM
 */

var Map = React.createClass({
  heatLayer: new L.FeatureGroup(),
  markerLayer: new L.FeatureGroup(),
  getDefaultProps: function () {
    return {
      lat: 37.8043,
      lng: -122.3952,
      visualisation: 'marker',
    }
  },
  getInitialState: function () {
    return {
      scrollPositionLeft: 0,
      loading: true,
    }
  },
  requestData: function (lat, lng) {
    this.setState({loading: true})
    var me = this
    $.get("/api/data?lat=" + lat + "&lng=" + lng).done(
      function (data) {
        me.newData(data)
      }
    );
  },
  newData: function (data) {
    //clean up of layers
    this.markerLayer.clearLayers()
    this.map.removeLayer(this.heatLayer)
    this.map.removeLayer(this.markerLayer)
    this.heatLayer = new L.FeatureGroup()

    // buildLayers
    var heatData = this.buildHeatLayer(data)
    this.heatLayer.addLayer(heatData)
    var markerData = this.buildMarkerLayer(data)
    this.markerLayer.addLayer(markerData)

    // Depending on props, show specific layer
    if (this.props.visualisation === 'marker') this.map.addLayer(this.markerLayer)
    if (this.props.visualisation === 'heatmap') this.map.addLayer(this.heatLayer)
    this.setState({loading: false})
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng || nextProps.zoom !== this.props.zoom ) {
      this.map.setView(new L.LatLng(nextProps.lat, nextProps.lng), nextProps.zoom)
    }

    if (Math.floor(nextProps.lat) !== Math.floor(this.props.lat) || Math.floor(nextProps.lng) !== Math.floor(this.props.lng)) {
      this.requestData(nextProps.lat, nextProps.lng)
    }

    if (nextProps.visualisation !== this.props.visualisation) {
      if (nextProps.visualisation === 'marker') {
        this.map.removeLayer(this.heatLayer)
        this.map.addLayer(this.markerLayer)
      } else if (nextProps.visualisation === 'heatmap') {
        this.map.removeLayer(this.markerLayer)
        this.map.addLayer(this.heatLayer)
      }
    }
  },
  buildMarkerLayer: function (data) {
    var convertedPoints = [],
    marker,
    icon,
    polygonOptions = {color: this.props.theme.primary},
    markerCluster = new L.MarkerClusterGroup({spiderfyDistanceMultiplier: 1.6, polygonOptions: polygonOptions})
    for (var i = 0; i < data.length; i++) {
      var entry = data[i]
      if (true) {
        icon = new customLeaflet.ThumbnailIcon({iconUrl: entry.thumb})
      }
      marker = new L.marker(
                          [entry.lat, entry.lng],
                          {
                            icon: icon,
                            alt: 'Image not available :(',
                            thumb: entry.thumb
                          }
                          )
      marker.on('click', customLeaflet.presentMarker)
      var linkToInstagram = "<a href='" + entry.url + "' target='_blank'>See this on Instagram</a>"
      marker.bindPopup(linkToInstagram, {className: 'graff-popup', closeOnClick: false, closeButton: false})
      if ( entry.thumb.length ) { convertedPoints.push(marker) }

    }
    if (true) {
      return markerCluster.addLayers(convertedPoints)
    } else {
      return L.layerGroup(convertedPoints)
    }
  },
  buildHeatLayer: function (data) {
    var latlngs = []

    for (var i = 0; i < data.length; i++) {
      var entry = data[i]
      latlngs.push(L.latLng(entry.lat, entry.lng))
    }
    return L.heatLayer(latlngs, {gradient: {0.1: '#34495e', 0.7: this.props.theme.primary}, blur: 40})
  },
  componentDidMount: function () {
    var me = this

    if ('geolocation' in navigator && this.props.seekPosition) {
      navigator.geolocation.getCurrentPosition(function (position) {
        me.map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), me.props.zoom)
      })
    }

    var lat = this.props.lat
    var lng = this.props.lng

    this.map = new L.Map(this.refs.leafletTarget.getDOMNode(), {
      layers: [],
      center: new L.LatLng(lat, lng),
      zoom: Math.round(this.props.zoom),
      minZoom: 10,
      maxBounds: [[-85, -180.0], [85, 180.0]],
      zoomControl: false,
      markerZoomAnimation: false,
      fadeAnimation: false,
      boxZoom: true,
    }
    )

    this.requestData(lat, lng)

    this.backgroundTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/tokugawa.n9764446/{z}/{x}/{y}.png', {
      attribution: '<a href="http://graffi.so" target="_blank"> Graffi.so </a>| <a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    }) // Mapbox map tiles

    this.map.addLayer(this.backgroundTiles)
    this.map.addLayer(this.markerLayer)
    this.map.addLayer(this.heatLayer)

    $(window).scroll(function () {
      var scrollPositionLeft = $(window).scrollLeft()
      me.setState({scrollPositionLeft: scrollPositionLeft})
    })

    this.map.on('zoomend', this.updateZoom)
    this.map.on('moveend', this.updateCenter)

  },
  updateCenter: function (evt) {
    if (evt) {
      this.updateURL({})
    }
  },
  updateZoom: function (evt) {
    if (evt) {
      this.updateURL({})
    }
  },
  updateURL: function (options) {
    var getParams = {}
    var getQuery = {
      zoom: options.zoom || Math.round(this.map.getZoom()),
      lat: options.lat || this.map.getCenter().lat,
      lng: options.lng || this.map.getCenter().lng,
      vis: options.vis || this.props.visualisation,
    }

    this.props.transitionTo('/', getParams, getQuery)
  },
  toggleVisualisation: function (visualisation) {
    this.updateURL({
      vis: visualisation,
    })
  },
  render: function () {
    var scrollOffsetLeft = this.state.scrollPositionLeft,
    loadingSpinner
    console.log(this.props.visualisation)

    if (this.state.loading) {
      var spinnerStyling = {
        position: "absolute",
        fontSize: "5vw",
        left: scrollOffsetLeft + (document.documentElement.offsetWidth/2),
        top: 120,
        color: this.props.theme.primary,
      }
      loadingSpinner = (
          <span className='fa fa-spinner spinner' style={spinnerStyling}></span>
        )
    }

    var mapStyling = {
      left: scrollOffsetLeft,
      top: 0,
      bottom: 0,
      right: -scrollOffsetLeft,
      position: 'absolute',
      backgroundColor: 'f1f1f1',
      overflow: 'hidden'
    }

    return (
      <div className='container'>
        <div ref='leafletTarget' id='map' style={mapStyling}>
        </div>
        {loadingSpinner}
        <MapTools map={this.map}
                  theme={this.props.theme}
                  mapStyling={mapStyling}
                  visualisation={this.props.visualisation}
                  toggleVisualisation={this.toggleVisualisation}/>
      </div>
      )
  },
})
