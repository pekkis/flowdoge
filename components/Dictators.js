var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var ImmutableRenderMixin = require('react-immutable-render-mixin')
var Col = require('react-bootstrap/Col');
var Row = require('react-bootstrap/Row');
var Dictator = require('./Dictator');

var Dictators = React.createClass({

    mixins: [ImmutableRenderMixin],

    render: function() {
        
        return (
            <Row>
                
                {this.props.dictators.map(function(d) {

                    return (<Dictator key={d.uuid} data={d} />);

                }).toArray()}
                
            </Row>
        );
    },



});

module.exports = Dictators;