
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

var Fluxxor = require('Fluxxor');

require('bootstrap-jquery/dist/js/npm.js');


var constants = require('./constants');
var DictatorStore = require('./stores/DictatorStore');

var actions = {
  loadDictators: function() {
    
    $.get('http://diktaattoriporssi.com/api/dictator').then(function(dictators) {
        this.dispatch(constants.LOAD_DICTATORS, { 'dictators': dictators });    
    }.bind(this));

    
  }
};

var stores = {
  DictatorStore: new DictatorStore()
};

var flux = new Fluxxor.Flux(stores, actions);

flux.on("change", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});


var routes = (
  <Route handler={DictatorRankingApp} path="/">
    <DefaultRoute handler={DictatorRanking}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler flux={flux}/>, document.getElementById('app'));
});