var React = require('react');
var Col = require('react-bootstrap/Col');
var Row = require('react-bootstrap/Row');
var Grid = require('react-bootstrap/Grid');

var Router = require('react-router');

var Nick = React.createClass({

    mixins: [Router.Navigation],

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

    setNick: function(evt) {
        evt.preventDefault();
        this.transitionTo('doge', {'nick': this.refs.nick.getDOMNode().value});
    }

});

module.exports = Nick;