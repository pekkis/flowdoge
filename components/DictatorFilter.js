var React = require('react');

var DictatorFilter = React.createClass({

    render: function() {
        return (
            <div>
                <input onChange={this.props.onChange} />

                <button onClick={this.props.onLusso}>Lusso</button>

            </div>
        );
    }

});

module.exports = DictatorFilter;