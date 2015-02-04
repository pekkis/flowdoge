
/**
 * @jsx React.DOM
 */

var React = require('react');
var Immutable = require('immutable');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var $ = require('jquery');



require('./app.less');
require('bootstrap-jquery/dist/js/npm.js');

var routes = (
  <Route handler={DictatorRankingApp} path="/">
    <DefaultRoute handler={Dictators}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('learning-app'));
});