var React = require('react');
var Col = require('react-bootstrap/Col');
var Row = require('react-bootstrap/Row');

var Message = React.createClass({

    render: function() {
        return (
        
            <Col md={12}>
                <form onSubmit={this.post}>
                    <input ref="message" type="text" autoFocus />
                    <button type="submit">Louskuta</button>
                </form>
            </Col>
    
        );
    },

    post: function(event) {
        event.preventDefault();
        this.props.onPost(this.refs.message.getDOMNode().value);
        this.refs.message.getDOMNode().value = '';
    }


});

module.exports = Message;