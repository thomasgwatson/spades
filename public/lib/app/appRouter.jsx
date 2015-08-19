/**
 * @jsx React.DOM
 */

var Router = ReactRouter;
var Route = Router.Route;
var Redirect = Router.Redirect;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var State = Router.State;

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
    return {};
  },
  componentDidMount: function() {
    //load data based on queryStrings.
    //queryString should specify centroid of map and zoom level
    //queryString should specify time-period under review
    this.getQuery()

  },
  render: function() {
    if(true) {
      return (<HomePage />);
    }
    return (<div />);
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