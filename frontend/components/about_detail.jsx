var React = require('react');
var ReactDOM = require('react-dom');
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
    this.refs.editButton.className = 'hidePls';
  },

  clickCancel: function(event) {
    event.preventDefault();
    this.setState({ editting: false });
    this.refs.editButton.className = 'aboutDetailToggle';
  },

  clickUpdate: function(event) {
    event.preventDefault();
    var userInfo = SessionStore.session();
    var param = this.props.updateParameter;
    var updatedInfo = { personality: { [param]: this.refs['textRef'].value }};
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
