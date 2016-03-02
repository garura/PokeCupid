var React = require('react');
var AboutDetail = require('./about_detail');
var ErrorStore = require('../stores/errors');

var About = React.createClass({

  getInitialState: function() {
    console.log("initial");
    return ({ errors: ErrorStore.all()});
  },

  componentDidMount: function() {
    this.errorToken = ErrorStore.addListener(this.asdf);
  },

  componentWillUnmount: function() {
    this.errorToken.remove();
  },

  asdf: function() {
    this.setState({errors: ErrorStore.all()});
  },

  render: function() {
    return (
      <div id='aboutDiv'>
        <div id='aboutLeft'>
          <AboutDetail message='My self-summary'
                       subtext={this.state.errors} />
        </div>
        <div id='aboutRight'>
        </div>
      </div>
    );
  }

});

module.exports = About;
