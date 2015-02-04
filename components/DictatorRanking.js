var React = require('react');
var Immutable = require('immutable');
var DictatorService = require('../services/DictatorService.js');
var ImmutableRenderMixin = require('react-immutable-render-mixin')
var Grid = require('react-bootstrap/Grid');
var Col = require('react-bootstrap/Col');
var Row = require('react-bootstrap/Row');
var Dictators = require('./Dictators');
var DictatorFilter = require('./DictatorFilter');

var DictatorRanking = React.createClass({

    mixins: [ImmutableRenderMixin],

    getInitialState: function() {
        return {
            'dictators': Immutable.List([]),
            'filter': ''
        };
    },

    componentDidMount: function() {

        DictatorService.findAll().then(function(dictators) {

            dictators = Immutable.List(dictators).filter(function(d) {
                return d.canonicalRanking;
            }).sort(function(a, b) {
                return (a.canonicalRanking > b.canonicalRanking) ? 1: -1;
            });


            this.setState({
                'dictators': dictators
            })
            
        }.bind(this));

    },

    render: function() {
        
        return (
            
            <Grid>
                <DictatorFilter onChange={this.onChange} />
                <Dictators dictators={this.getTheDictators()} />
            </Grid>
        );
        
    },

    getTheDictators: function() {

        console.log('getting dikus');

        var self = this;
        return this.state.dictators.filter(function(dictator) {
            return dictator.identity.displayName.indexOf(self.state.filter) !== -1
        });

    },

    onChange: function(evt) {
        
        this.setState({
            'filter': evt.target.value
        });
    }



});

module.exports = DictatorRanking;