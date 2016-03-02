var React = require('react');
var ErrorActions = require('../actions/error_actions');

var AboutDetail = React.createClass({

  getInitialState: function() {
    return ({ editting: false, subtext: this.props.subtext });
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({subtext: newProps.subtext})
  },

  handleClicked: function(event) {
    event.preventDefault();
    var editting = !this.state.editting;
    this.setState({ editting: editting });
  },

  clickCancel: function(event) {
    event.preventDefault();
    this.setState({ editting: false });
  },

  clickUpdate: function(event) {
    event.preventDefault();
    ErrorActions.sendErrors(this.refs['textRef'].value);
    // TODO: poke_personality store, not error store. need to get api from
    this.setState({ editting: false });
  },

  updateInfo: function(newText) {
    this.props.callback(newText);
    this.setState({ editting: false });
  },

  render: function() {
    if (this.state.editting) {
      var content = (
        <div>
          <textarea ref='textRef' defaultValue={this.props.subtext}></textarea>
          <button type='button' onClick={this.clickUpdate}>Update</button>
          <button type='button' onClick={this.clickCancel}>Cancel</button>
        </div>
      );
    }
    else {
      var content = <p>{this.props.subtext}</p>;
    }

    return (
      <div>
        <p className='aboutHeader'>{this.props.message}</p>
        <button type='button' onClick={this.handleClicked}>change</button>
        {content}
      </div>
    );
  }

});

module.exports = AboutDetail;
