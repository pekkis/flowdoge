var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Grid = require('react-bootstrap/Grid');
var DictatorStore = require('../stores/DictatorStore');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var DictatorRankingApp = React.createClass({

    mixins: [FluxMixin],

    render: function() {
        return (
            
            <RouteHandler />
            
        );
    },

    componentDidMount: function() {
        
        console.log(this.props.flux.actions);

        this.props.flux.actions.loadDictators();
    }

});

module.exports = DictatorRankingApp;