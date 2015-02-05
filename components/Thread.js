var React = require('react');

var Thread = React.createClass({

    render: function() {
        return (
            <div className="messages">
                
                {this.props.messages.map(function(m) {
                    return (
                        <div className="message">
                            <strong>{m.nick}</strong>: {m.message}
                        </div>
                    );
                }.bind(this)).toArray()}

            </div>
        );
    }

});

module.exports = Thread;