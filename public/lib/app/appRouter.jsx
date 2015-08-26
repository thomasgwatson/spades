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
  mixins: [Router.State, Navigation],
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
  },
  render: function() {
    var lat, lng, zoom
    lat = this.state.lat
    lng = this.state.lng
    zoom = 13
    if(this.getQuery().lat){lat = this.getQuery().lat}
    if(this.getQuery().lng){lng = this.getQuery().lng}
    if(this.getQuery().zoom){zoom = this.getQuery().zoom}

    return (
      <div className="heighty">
        <HomePage backingImages={backingImages} />
        <Map lat={lat}
             lng={lng}
             zoom={zoom}
             transitionTo={this.transitionTo} />
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