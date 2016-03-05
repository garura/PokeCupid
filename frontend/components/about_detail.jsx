var React = require('react');
var ReactDOM = require('react-dom');
var apiUtil = require('../util/apiUtil');
var SessionStore = require('../stores/session');

var AboutDetail = React.createClass({

  getInitialState: function() {
    var userInfo = SessionStore.session() || {};
    return ({ editting: false,
              subtext: this.props.subtext,
              defaultText: this.props.defaultText,
              userInfo: userInfo});
  },

  updateUserInfo: function() {
    this.setState({userInfo: SessionStore.session()});
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({subtext: newProps.subtext})
  },

  handleClicked: function(event) {
    event.preventDefault();
    var editting = !this.state.editting;
    this.setState({ editting: editting });
    this.refs.editButton.className = 'hidePls';
  },

  clickCancel: function(event) {
    event.preventDefault();
    this.setState({ editting: false });
    this.refs.editButton.className = 'aboutDetailToggle';
  },

  clickUpdate: function(event) {
    event.preventDefault();
    var userInfo = this.state.userInfo;
    var param = this.props.updateParameter;
    var value = this.refs['textRef'].value;
    if (value == false && value.indexOf("0") < 0) {
      var paramValue = null;
    }
    else {
      var paramValue = this.refs['textRef'].value;
    }
    var updatedInfo = { personality: { [param]: paramValue }};
    apiUtil.updateUserPersonality(userInfo, updatedInfo);
    this.setState({ editting: false });
    this.refs.editButton.className = 'aboutDetailToggle';
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
          <textarea autoFocus className='aboutTextArea' ref='textRef' placeholder={placeholderText} defaultValue={displayText}></textarea>
          <button className='aboutTextConfirm' type='button' onClick={this.clickUpdate}>Save</button>
          <button className='aboutTextCancel' type='button' onClick={this.clickCancel}>Cancel</button>
        </div>
      );
    }
    else if (displayText){
      var content = (
        <div className='aboutTextDiv'>
          <p className='displayText'>{displayText}</p>
        </div>
      );
    }
    else {
      var content = (
        <div className='aboutTextDiv'>
          <p className='displayText placeholder'>{this.state.defaultText}</p>
        </div>
      );
    }

    return (
      <div className='aboutDetailDiv'>
        <p className='aboutDetailHeader'>{this.props.message}</p>
        <button ref='editButton' className='aboutDetailToggle' type='button' onClick={this.handleClicked}>
          <img className='pencil' src='./assets/pencil.png'></img>
        </button>
        {content}
      </div>
    );
  }

});

module.exports = AboutDetail;
