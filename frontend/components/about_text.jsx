var React = require('react');
var ErrorActions = require('../actions/error_actions');

var AboutText = React.createClass({

  getInitialState: function() {
    // put prop message into state?
    if (this.props.editMode === false) {
      var editMode = false;
    }
    else {
      var editMode = true;
    }
    return ({ editMode: editMode });
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({editMode: newProps.editMode});
  },

  clickCancel: function(event) {
    event.preventDefault();
    this.setState({editMode: false});
  },

  clickUpdate: function(event) {
    event.preventDefault();
    ErrorActions.sendErrors([this.refs['textRef'].value]);
    this.setState({editMode: false});
  },

  render: function() {
    if (this.state.editMode) {
      var content = (
        <div>
          <textarea ref='textRef' defaultValue={this.props.subtext}></textarea>
          <button type='button' onClick={this.clickUpdate}>Update</button>
          <button type='button' onClick={this.clickCancel}>Cancel</button>
        </div>
      );
    }
    else {
      var content = <p>{this.state.text}</p>;
    }

    return (
      <div>
        {content}
      </div>
    );
  }

});

module.exports = AboutText;
