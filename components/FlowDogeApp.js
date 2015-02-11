var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Grid = require('react-bootstrap/Grid');
var Nav = require('react-bootstrap/Nav');
var Navbar = require('react-bootstrap/Navbar');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FlowDogeApp = React.createClass({

    mixins: [FluxMixin],

    getInitialState: function() {
        return {
            
        };
    },

    render: function() {

        var brand = ([<img className="doge" src={require("../stuff/doge.png")} alt="Flowdoge" />, 'Flowdoge!']);

        return (
            
            <div>
                <Navbar fixedTop={true} brand={brand}>
                </Navbar>

                <Grid>
                    <RouteHandler {...this.props}/>
                </Grid>
            </div>
        );
    }

});

module.exports = FlowDogeApp;
