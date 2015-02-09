var React = require('react');
var Immutable = require('immutable');
var ImmutableRenderMixin = require('react-immutable-render-mixin')
var Grid = require('react-bootstrap/Grid');
var Col = require('react-bootstrap/Col');
var Row = require('react-bootstrap/Row');
var Threads = require('./Threads');
var Thread = require('./Thread');
var Message = require('./Message');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Router = require('react-router');
var ActiveUsers = require('./ActiveUsers');



var FlowDoge = React.createClass({

    mixins: [Router.State, FluxMixin, StoreWatchMixin("ThreadStore", "MessageStore", "UserStore")],
    
    getInitialState: function() {
        return {
            
        };
    },

    getStateFromFlux: function() {
        var flux = this.getFlux();
        return {
            'nick': flux.store("UserStore").getNick(),
            'threads': flux.store("ThreadStore").getThreads(),
            'currentThread': flux.store('ThreadStore').getCurrentThread(),
            'messages': flux.store('MessageStore').getMessages(flux.store('ThreadStore').getCurrentThread())
        }
    },

    render: function() {

        return (

            <Row className="doge">

                <ActiveUsers />

                <Col md={4}>
                    <Threads threads={this.state.threads} current={this.state.currentThread} onClick={this.changeThread} />
                </Col>

                <Col md={8}>
                    <Thread nick={this.state.nick} messages={this.state.messages} />
                </Col>

                <Message nick={this.state.nick} thread={this.state.currentThread} onPost={this.postMessage}/>

            </Row>

            

        );
        
    },

    changeThread: function(thread) {
        this.getFlux().actions.changeThread(thread);
    },

    postMessage: function(messageTxt) {
        
        var message = {
            thread: this.state.currentThread.id,
            nick: this.getFlux().store('UserStore').nick,
            message: messageTxt
        };


        // Todo fucktor.
        this.getFlux().store('UserStore').getSocket().emit(
            'message',
                message
        );
    },

    componentDidMount: function() {
        
        this.getFlux().actions.user.connect(this.getParams().nick);

    }

    
});

module.exports = FlowDoge;