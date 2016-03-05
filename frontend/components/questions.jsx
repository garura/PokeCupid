var React = require('react');
var ResponseStore = require('../stores/response');
var SessionStore = require('../stores/session');
var apiUtil = require('../util/apiUtil');
var QuestionDetail = require('./question_detail');

var Questions = React.createClass({

  getInitialState: function() {
    var response = ResponseStore.response();
    var question_one = response[0];
    var question_two = response[1];
    var question_three = response[2];
    var question_four = response[3];
    var question_five = response[4];
    var question_six = response[5];

    return ({ response: response,
              question_one: question_one,
              question_two: question_two,
              question_three: question_three,
              question_four: question_four,
              question_five: question_five,
              question_six: question_six});
  },

  componentDidMount: function() {
    this.responseToken = ResponseStore.addListener(this.updateResponse);
    this.sessionToken = SessionStore.addListener(this.updateUserInfo);
    var id = SessionStore.session().id || window.localStorage.getItem('user_id');
    apiUtil.getSessionInfo(id);
  },

  componentWillUnmount: function() {
    this.responseToken.remove();
    this.sessionToken.remove();
  },

  updateUserInfo: function() {
    var userInfo = SessionStore.session();
    this.setState({ userInfo: userInfo });
  // api req to update response
    apiUtil.getUserResponse(userInfo);
  },

  updateResponse: function() {

  },

  render: function() {
    // <QuestionDetail questionIndex={0} userResponse={this.state.question_one}/>
    // <QuestionDetail questionIndex={1} userResponse={this.state.question_two}/>
    // <QuestionDetail questionIndex={2} userResponse={this.state.question_three}/>
    // <QuestionDetail questionIndex={3} userResponse={this.state.question_four}/>
    // <QuestionDetail questionIndex={4} userResponse={this.state.question_five}/>
    // <QuestionDetail questionIndex={5} userResponse={this.state.question_six}/>
    return (
      <div>
        Question detail
      </div>
    );
  }

});

module.exports = Questions;
