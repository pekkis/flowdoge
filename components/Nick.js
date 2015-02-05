var React = require('react');
var Col = require('react-bootstrap/Col');
var Row = require('react-bootstrap/Row');
var Grid = require('react-bootstrap/Grid');

var Nick = React.createClass({

    render: function() {
        return (
        
            <Grid>
                <Row>
                    <Col md={12}>
                        
                        <h1>gimme nickname</h1>    

                        <input ref="nick" type="text" />
                        <button onClick={this.setNick}>Submit</button>
                    </Col>
                </Row>
            </Grid>
        );
    },

    setNick: function() {
        this.props.onChange(this.refs.nick.getDOMNode().value);
    }

});

module.exports = Nick;