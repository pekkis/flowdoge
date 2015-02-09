var React = require('react');
var Col = require('react-bootstrap/Col');
var Row = require('react-bootstrap/Row');

var Message = React.createClass({

    render: function() {
        return (
        
                <div id="message">
                    <form onSubmit={this.post}>
                        <input className="form-control" ref="message" type="text" autoFocus placeholder={this.getPlaceholder()} />
                    </form>
                </div>
    
        );
    },

    getPlaceholder: function() {
        return this.props.nick + ", louskuttele kanavalla '" + this.props.thread.name + "'";
    },

    post: function(evt) {
        evt.preventDefault();

        this.props.onPost(this.refs.message.getDOMNode().value);
        this.refs.message.getDOMNode().value = '';
    }


});

module.exports = Message;