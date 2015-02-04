
/**
 * @jsx React.DOM
 */

require('./app.less');

var React = require('react');
var Immutable = require('immutable');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var $ = require('jquery');

var DictatorRankingApp = require('./components/DictatorRankingApp');
var DictatorRanking = require('./components/DictatorRanking');
var NotFound = require('./components/NotFound');


require('bootstrap-jquery/dist/js/npm.js');

var routes = (
  <Route handler={DictatorRankingApp} path="/">
    <DefaultRoute handler={DictatorRanking}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});