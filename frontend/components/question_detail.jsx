var React = require('react');
var ResponseStore = require('../stores/response');
var apiUtil = require('../util/apiUtil');

var QuestionDetail = React.createClass({

  getInitialState: function() {
    var userIndexResponse = this.props.userIndexResponse;
    var index = this.props.questionIndex;
    return ({ index: index, userIndexResponse: userIndexResponse})
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({ userIndexResponse: newProps.userIndexResponse });
  },

  updateTrue: function(event) {
    event.preventDefault();
    var userResponse = ResponseStore.response();
    var newResponse = "";
    for (var i = 0; i < 6; i++) {
      if (i === this.state.index) {
        newResponse += "T";
      }
      else {
        newResponse += userResponse[i];
      }
    }
    apiUtil.updateUserResponse(this.props.userId, newResponse);
  },
  updateFalse: function(event) {
    event.preventDefault();
    var userResponse = ResponseStore.response();
    var newResponse = "";
    for (var i = 0; i < 6; i++) {
      if (i === this.state.index) {
        newResponse += "F";
      }
      else {
        newResponse += userResponse[i];
      }
    }
    apiUtil.updateUserResponse(this.props.userId, newResponse);
  },
  updateNoAnswer: function(event) {
    event.preventDefault();
    var userResponse = ResponseStore.response();
    var newResponse = "";
    for (var i = 0; i < 6; i++) {
      if (i === this.state.index) {
        newResponse += " ";
      }
      else {
        newResponse += userResponse[i];
      }
    }
    apiUtil.updateUserResponse(this.props.userId, newResponse);
  },

  render: function() {

    var trueClass = this.state.userIndexResponse === "T" ? " isValue": "";
    var falseClass = this.state.userIndexResponse === "F" ? " isValue": "";
    var noClass = this.state.userIndexResponse === " " ? " isValue": "";

    return (
      <div className='questionDetailDiv'>
        <p className='questionDetailText'>{this.props.questionText}</p>
        <button className={'questionDetailTrue' + trueClass} onClick={this.updateTrue}>{this.props.trueText}</button>
        <button className={'questionDetailFalse' + falseClass} onClick={this.updateFalse}>{this.props.falseText}</button>
        <br></br>
        <button className={'questionDetailNone' + noClass} onClick={this.updateNoAnswer}>Choose not to answer.</button>
      </div>
    );
  }

});

module.exports = QuestionDetail;
