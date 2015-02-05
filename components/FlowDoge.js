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

var FlowDoge = React.createClass({

    mixins: [FluxMixin, StoreWatchMixin("ThreadStore", "MessageStore")],
    
    getInitialState: function() {
        return {
            
        };
    },

    getStateFromFlux: function() {
        var flux = this.getFlux();
        return {
            'threads': flux.store("ThreadStore").getThreads(),
            'currentThread': flux.store('ThreadStore').getCurrentThread(),
            'messages': flux.store('MessageStore').getMessages(flux.store('ThreadStore').getCurrentThread())
        }
    },

    render: function() {

        console.log('rendering');
        console.log(this.state.messages.toArray());
        

        return (

            <Row className="doge">
                <Col md={4}>
                    <Threads threads={this.state.threads} current={this.state.currentThread} onClick={this.changeThread} />
                </Col>

                <Col md={8}>
                    <Thread messages={this.state.messages} />
                </Col>

                <Message onPost={this.postMessage}/>

            </Row>

            

        );
        
    },

    changeThread: function(thread) {
        this.getFlux().actions.changeThread(thread);
    },

    postMessage: function(messageTxt) {
        
        var message = {
            nick: this.props.nick,
            message: messageTxt
        };

        this.getFlux().store('UserStore').getSocket().emit(
            'message',
            {'thread': this.state.currentThread, 'message': message}
        );
    }

    
});

module.exports = FlowDoge;