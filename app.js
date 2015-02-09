
/**
 * @jsx React.DOM
 */

require('./app.less');

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var FlowDogeApp = require('./components/FlowDogeApp');
var FlowDoge = require('./components/FlowDoge');
var Nick = require('./components/Nick');
var NotFound = require('./components/NotFound');

var flux = require('./flux');

var routes = (
  <Route handler={FlowDogeApp} path="/">
    <DefaultRoute handler={Nick}/>
    <Route name="doge" path="flowdoge/:nick" handler={FlowDoge} />
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler flux={flux}/>, document.getElementById('app'));
});
