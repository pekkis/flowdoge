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

        var ret =  {
            'nick': this.getFlux().store('UserStore').getNick()
        };

        console.log(ret);
        return ret;
    },

    render: function() {
        
        if (!this.state.nick) {
            return (<Nick onChange={this.setNick}/>);
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
        
        var self = this;

        var socket = require('socket.io-client')('http://dr-kobros.com:3003');
        
        socket.on('join', function(payload) {
            
            console.log('tussisisisi');
            console.log(payload);


            self.getFlux().actions.join(payload.nick);
        });

        socket.on('message', function (payload) {
            self.getFlux().actions.postMessage(payload.thread, payload.message);
        });

        socket.on('connect', function() {
            
            self.getFlux().actions.connect(socket, nick);
            socket.emit('join', {nick: self.state.nick });

            
        });


    }

});

module.exports = FlowDogeApp;
