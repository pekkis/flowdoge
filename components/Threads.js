var React = require('react/addons');
var cx = React.addons.classSet;

var Threads = React.createClass({

    render: function() {
        
        return (
            <div className="threads">
                
                {this.props.threads.map(function(t) {

                    var classes = cx({
                        'thread': true,
                        'current': t.id == this.props.current
                    });

                    return (<div className={classes}>
                        <a href="#" onClick={this.click.bind(this, t)}>{t.name}</a>
                    </div>);
                }.bind(this)).toArray()}


            </div>
        );
    },

    click: function(thread) {
        this.props.onClick(thread);
    }

});

module.exports = Threads;