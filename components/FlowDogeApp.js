var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Grid = require('react-bootstrap/Grid');

var ActiveUsers = require('./ActiveUsers');
var Nick = require('./Nick');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FlowDogeApp = React.createClass({

    mixins: [FluxMixin, StoreWatchMixin("UserStore")],

    getInitialState: function() {
        return {
            
        };
    },

    getStateFromFlux: function() {

        return {
            'nick': this.getFlux().store('UserStore').getNick()
        };
    },

    render: function() {
        
        if (!this.state.nick) {
            return (
                <Nick onChange={this.setNick}/>);
        }

        return (
            
            <Grid>

                <header>
                    <h1><img width="50" height="50" src={require('../stuff/doge.png')} />Flowdoge</h1>
                </header>

                <ActiveUsers />

                <RouteHandler nick={this.state.nick}/>
            </Grid>
        );
    },

    setNick: function(nick) {
        this.getFlux().actions.connect(nick);
    }

});

module.exports = FlowDogeApp;
