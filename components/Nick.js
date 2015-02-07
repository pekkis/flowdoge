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
                        <form onSubmit={this.setNick}>
                            <h1>gimme nickname</h1>

                            <input ref="nick" type="text" autoFocus />
                            <button type="submit">Submit</button>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    },

    setNick: function(event) {
        event.preventDefault();
        this.props.onChange(this.refs.nick.getDOMNode().value);
    }

});

module.exports = Nick;