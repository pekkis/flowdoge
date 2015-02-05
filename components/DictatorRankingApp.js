var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Grid = require('react-bootstrap/Grid');
var DictatorStore = require('../stores/DictatorStore');

var DictatorRankingApp = React.createClass({

    render: function() {
        return (
            
            <RouteHandler flux={this.props.flux} />
            
        );
    },

    componentDidMount: function() {
        
        console.log(this.props.flux.actions);

        this.props.flux.actions.loadDictators();
    }

});

module.exports = DictatorRankingApp;