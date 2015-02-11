var React = require('react');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var Thread = React.createClass({

    render: function() {
        return (
            <div className="messages">
                
                {this.props.messages.map(function(m) {
                    return (
                        <div className="message">
                            <strong>{m.nick}</strong>: {m.message}
                            <span className="postDate">{m.postDate}</span>
                        </div>
                    );
                }.bind(this)).toArray()}

            </div>
        );
    },

    componentDidUpdate: function() {

        if (lastMessage = this.props.messages.last()) {
            if (this.props.nick === lastMessage.nick) {
                window.scrollTo(0, document.body.scrollHeight);
            }

        }

    }

});

module.exports = Thread;