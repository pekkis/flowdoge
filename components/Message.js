var React = require('react');
var Col = require('react-bootstrap/Col');
var Row = require('react-bootstrap/Row');

var Message = React.createClass({

    render: function() {
        return (
        
            <Col md={12}>
                <input ref="message" type="text" />
                <button onClick={this.post}>Louskuta</button>
            </Col>
    
        );
    },

    post: function() {
        this.props.onPost(this.refs.message.getDOMNode().value);
    }


});

module.exports = Message;