var React = require('react');

var DictatorFilter = React.createClass({

    render: function() {
        return (
            <div>
                <input onChange={this.props.onChange} />
            </div>
        );
    }

});

module.exports = DictatorFilter;