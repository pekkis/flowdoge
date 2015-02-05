var React = require('react');
var Immutable = require('immutable');
var DictatorService = require('../services/DictatorService.js');
var ImmutableRenderMixin = require('react-immutable-render-mixin')
var Grid = require('react-bootstrap/Grid');
var Col = require('react-bootstrap/Col');
var Row = require('react-bootstrap/Row');
var Dictators = require('./Dictators');
var DictatorFilter = require('./DictatorFilter');
var DictatorStore = require('../stores/DictatorStore');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var DictatorRanking = React.createClass({

    mixins: [FluxMixin, StoreWatchMixin("DictatorStore"), ImmutableRenderMixin],
    
    getInitialState: function() {
        return {
            'filter': ''
        };
    },

    getStateFromFlux: function() {
        var flux = this.getFlux();
        return flux.store("DictatorStore").getState();
    },

    render: function() {
        
        console.log(this.state);

        return (
            
            <Grid>
                <DictatorFilter onChange={this.onChange} onLusso={this.onLusso} />
                <Dictators dictators={this.getTheDictators()} />
            </Grid>
        );
        
    },

    getTheDictators: function() {

        var self = this;
        return this.state.dictators.filter(function(dictator) {
            return dictator.identity.displayName.indexOf(self.state.filter) !== -1
        });

    },

    onChange: function(evt) {
        
        this.setState({
            'filter': evt.target.value
        });
    },

    onLusso: function() {

        console.log("LUSSO");
        
    }

});

module.exports = DictatorRanking;