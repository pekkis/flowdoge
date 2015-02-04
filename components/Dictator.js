var React = require('react');
var Col = require('react-bootstrap/Col');

var Dictator = React.createClass({

    render: function() {
        return (
            <Col md={12}>

                <h2>{this.props.data.identity.displayName}</h2>

            </Col>
        );
        
    }

});

module.exports = Dictator;