/**
 * @jsx React.DOM
 */

var Router = ReactRouter;
var Route = Router.Route;
var Redirect = Router.Redirect;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var State = Router.State;

var backingImages = [
                      'bogatapropaganda.jpg',
                      'nyc.jpg',
                      'oakland.jpg',
                      'openspace.jpg',
                      'perthjourney.jpg',
                      'perthlastchance.jpg',
                      'portland.jpg',
                      'sfladies1.jpg',
                      'sfladies2.jpg' ]

var appHandler = React.createClass({
  mixins: [State],
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {

  },
  render: function () {
    return (
<RouteHandler />
    );
  }
});

var IframeMapHandler = React.createClass({
  mixins: [Router.State],
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    //load data based on queryStrings.
    //queryString should specify tags/users to shape the API call for data
    //queryString should specify centroid of map
    //queryString could specify styling

  },
  render: function() {
    if(true) {
      return (<Map />);
    }
    return (<div />);
  }
})

var homeHandler = React.createClass({
  mixins: [Router.State],
  getInitialState: function() {
    return {
      lat: 37.8043,
      lng: -122.3952,
      zoom: 14,
      data: false
    };
  },
  componentDidMount: function() {
    //load data based on queryStrings.
    //queryString should specify centroid of map and zoom level
    //queryString should specify time-period under review
    var me = this

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        me.setState({lat: position.coords.latitude, lng: position.coords.longitude});
      });
    }
  },
  requestData: function(lat, lng){
    $.get("/api/data?lat=" + lat +"&lng=" + lng).done(
      function(data) {
        me.setState({
          data: data
        });
      }
    );
  },
  render: function() {
    var lat, lng, zoom
    lat = this.state.lat
    lng = this.state.lng
    if(this.getQuery(lat).length){lat = this.getQuery(lat)}
    if(this.getQuery(lng).length){lng = this.getQuery(lng)}

    return (
      <div className="heighty">
        <HomePage backingImages={backingImages} />
    this.requestData()
        <Map lat={lat} lng={lng} data={this.state.data} requestData={this.requestData} />
      </div>
      );
  }
})

var routes = (
<Route handler={appHandler}>
  <Route name="iframe-map" handler={IframeMapHandler} path="/iframe" />
  <Route name="home" handler={homeHandler} path="/" />
  <Redirect to="" />
</Route>
);


$(document).ready(function() {
  ReactRouter.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('stuff'));
  });
})