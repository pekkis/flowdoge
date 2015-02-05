
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

var FlowDogeApp = require('./components/FlowDogeApp');
var FlowDoge = require('./components/FlowDoge');
var NotFound = require('./components/NotFound');

var Fluxxor = require('Fluxxor');

require('bootstrap-jquery/dist/js/npm.js');


var constants = require('./constants');
var UserStore = require('./stores/UserStore');
var ThreadStore = require('./stores/ThreadStore');
var MessageStore = require('./stores/MessageStore');

var actions = require('./actions');

var stores = {
  UserStore: new UserStore(),
  ThreadStore: new ThreadStore(),
  MessageStore: new MessageStore()
};

var flux = new Fluxxor.Flux(stores, actions);

flux.on("change", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

var routes = (
  <Route handler={FlowDogeApp} path="/">
    <DefaultRoute handler={FlowDoge}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler flux={flux}/>, document.getElementById('app'));
});