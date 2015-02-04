var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var ImmutableRenderMixin = require('react-immutable-render-mixin')
var Col = require('react-bootstrap/Col');
var Row = require('react-bootstrap/Row');
var Dictator = require('./Dictator');

var Dictators = React.createClass({

    mixins: [ImmutableRenderMixin],

    render: function() {
        
        console.log(this.props);

        return (
            <Row>
                <ReactCSSTransitionGroup transitionName="tussi">
                {this.props.dictators.map(function(d) {

                    return (<Dictator data={d} />);

                }).toArray()}
                </ReactCSSTransitionGroup>

            </Row>
        );
    },



});

module.exports = Dictators;