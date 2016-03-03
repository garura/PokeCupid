var React = require('react');
var apiUtil = require('../util/apiUtil');
var SessionStore = require('../stores/session');

var AboutDetail = React.createClass({

  getInitialState: function() {
    return ({ editting: false,
              subtext: this.props.subtext,
              defaultText: this.props.defaultText });
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
    var userInfo = SessionStore.session();
    var param = this.props.updateParameter;
    var updatedInfo = { personality: { [param]: this.refs['textRef'].value }};
    apiUtil.updateUserPersonality(userInfo, updatedInfo);
    this.setState({ editting: false });
  },

  updateInfo: function(newText) {
    this.props.callback(newText);
    this.setState({ editting: false });
  },

  render: function() {
    var displayText = this.state.subtext;
    var placeholderText = this.state.defaultText;
    if (this.state.editting) {
      var content = (
        <div className='aboutTextDiv'>
          <textarea className='aboutTextArea'ref='textRef' placeholder={placeholderText} defaultValue={displayText}></textarea>
          <button className='aboutTextConfirm' type='button' onClick={this.clickUpdate}>Update</button>
          <button className='aboutTextCancel' type='button' onClick={this.clickCancel}>Cancel</button>
        </div>
      );
    }
    else {
      displayText = displayText || this.state.defaultText; // show user info only if present
      var content = <p>{displayText}</p>;
    }

    return (
      <div className='aboutDetailDiv'>
        <p className='aboutDetailHeader'>{this.props.message}</p>
        <button className='aboutDetailToggle' type='button' onClick={this.handleClicked}>change</button>
        {content}
      </div>
    );
  }

});

module.exports = AboutDetail;
