/**
 * @jsx React.DOM
 */

var Router = ReactRouter
var Route = Router.Route
var Redirect = Router.Redirect
var RouteHandler = Router.RouteHandler
var Navigation = Router.Navigation
var State = Router.State

var backingImages = [
  'bogatapropaganda.jpg',
  'nyc.jpg',
  'oakland.jpg',
  'openspace.jpg',
  'perthjourney.jpg',
  'perthlastchance.jpg',
  'portland.jpg',
  'sfladies1.jpg',
  'sfladies2.jpg',
]

var appHandler = React.createClass({
  mixins: [State],
  getInitialState: function () {
    return {}
  },
  componentDidMount: function () {

  },
  render: function () {
    return (
<RouteHandler />
    )
  },
})

var IframeMapHandler = React.createClass({
  mixins: [Router.State],
  getInitialState: function () {
    return {}
  },
  componentDidMount: function () {
    //  load data based on queryStrings.
    //  queryString should specify tags/users to shape the API call for data
    //  queryString should specify centroid of map
    //  queryString could specify styling

  },
  render: function () {
    if (true) {
      return (<Map />)
    }
    return (<div />)
  },
})

var homeHandler = React.createClass({
  mixins: [Router.State, Navigation],
  getInitialState: function () {
    return {
      zoom: 14,
      data: false,
    }
  },
  componentDidMount: function () {
    //  load data based on queryStrings.
    //  queryString should specify centroid of map and zoom level
    //  queryString should specify time-period under review
  },
  render: function () {
    var lat, lng,
      seekPosition = true,
      zoom = 13,
      theme = {primary: '#FFD700', secondary: '#c7a900'},
      visualisation

    if (this.getQuery().lat) lat = this.getQuery().lat; seekPosition = false
    if (this.getQuery().lng) lng = this.getQuery().lng; seekPosition = false
    if (this.getQuery().zoom) zoom = Math.round(this.getQuery().zoom)
    if (this.getQuery().vis) visualisation = this.getQuery().vis

    return (
      <div className='heighty'>
        <HomePage backingImages={backingImages} theme={theme}/>
        <Map lat={lat}
             lng={lng}
             zoom={zoom}
             seekPosition={seekPosition}
             transitionTo={this.transitionTo}
             theme={theme}
             visualisation={visualisation} />
      </div>
      )
  },
})

var routes = (
<Route handler={appHandler}>
  <Route name='iframe-map' handler={IframeMapHandler} path='/iframe' />
  <Route name='home' handler={homeHandler} path='/' />
  <Redirect to='' />
</Route>
)

$(document).ready(function () {
  ReactRouter.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('stuff'))
  })
})
