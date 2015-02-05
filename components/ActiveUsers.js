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

var ActiveUsers = React.createClass({

    mixins: [FluxMixin, StoreWatchMixin("UserStore"), ImmutableRenderMixin],
    
    getInitialState: function() {
        return {
            
        };
    },

    getStateFromFlux: function() {
        var flux = this.getFlux();
        return {
            'users': flux.store("UserStore").getUsers()
        }
    },

    render: function() {
        
        var activeUsers = this.state.users.map(function(user) {
            return user.nick;
        }).toArray().join(', ');

        return (
            <Row className="users">
                <Col md={12}>
                    <strong>Aktiiviset käyttäjät:</strong> {activeUsers}
                </Col>
            </Row>
        );
        
    },

    
});

module.exports = ActiveUsers;