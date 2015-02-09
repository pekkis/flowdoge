var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Grid = require('react-bootstrap/Grid');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FlowDogeApp = React.createClass({

    mixins: [FluxMixin],

    getInitialState: function() {
        return {
            
        };
    },

    render: function() {
    
        return (
            
            <Grid>

                <header>
                    <h1><img src={require('../stuff/doge.png')} />Flowdoge</h1>
                </header>

                <RouteHandler />
            </Grid>
        );
    }

});

module.exports = FlowDogeApp;
