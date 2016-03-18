var React = require('react');
var ResponseStore = require('../stores/response');
var SessionStore = require('../stores/session');
var apiUtil = require('../util/apiUtil');
var QuestionDetail = require('./question_detail');

var questionText = {
  0: "What do you think is more important?",
  1: "Do you like to battle other Pokémon?",
  2: "Pokémon Red or Pokémon Blue?",
  3: "What do you think about legendary Pokémon?",
  4: "Do you believe MISSINGNO. really exists?",
  5: "Which way of evolving is better, leveling up or elemental stones?"
}

var Questions = React.createClass({

  getInitialState: function() {
    var response = ResponseStore.response();
    var question_one = response[0];
    var question_two = response[1];
    var question_three = response[2];
    var question_four = response[3];
    var question_five = response[4];
    var question_six = response[5];

    return ({ userInfo: {},
              response: response,
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
    if (userInfo.id) {
      apiUtil.getUserResponse(userInfo);
    }
  },

  updateResponse: function() {
    var response = ResponseStore.response();
    var question_one = response[0];
    var question_two = response[1];
    var question_three = response[2];
    var question_four = response[3];
    var question_five = response[4];
    var question_six = response[5];
    this.setState({ response: response,
              question_one: question_one,
              question_two: question_two,
              question_three: question_three,
              question_four: question_four,
              question_five: question_five,
              question_six: question_six});
  },

  render: function() {
    return (
      <div id='questionDiv'>
        <div id="leftQuestion">
          <QuestionDetail questionIndex={0}
                          userId={this.state.userInfo.id}
                          userIndexResponse={this.state.question_one}
                          questionText={questionText[0]}
                          trueText={"Being powerful."}
                          falseText={"Being a good friend."}/>
          <QuestionDetail questionIndex={1}
                          userId={this.state.userInfo.id}
                          userIndexResponse={this.state.question_two}
                          questionText={questionText[1]}
                          trueText={"Yes, I enjoy testing myself!"}
                          falseText={"No, I'm afraid of fainting..."}/>
          <QuestionDetail questionIndex={2}
                          userId={this.state.userInfo.id}
                          userIndexResponse={this.state.question_three}
                          questionText={questionText[2]}
                          trueText={"Red!"}
                          falseText={"Blue!"}/>
        </div>
        <div id='rightQuestion'>
          <QuestionDetail questionIndex={3}
                          userId={this.state.userInfo.id}
                          userIndexResponse={this.state.question_four}
                          questionText={questionText[3]}
                          trueText={"They're just like us."}
                          falseText={"They're amazing!"}/>
          <QuestionDetail questionIndex={4}
                          userId={this.state.userInfo.id}
                          userIndexResponse={this.state.question_five}
                          questionText={questionText[4]}
                          trueText={"Yes, I saw it once!"}
                          falseText={"Never heard of it."}/>
          <QuestionDetail questionIndex={5}
                          userId={this.state.userInfo.id}
                          userIndexResponse={this.state.question_six}
                          questionText={questionText[5]}
                          trueText={"Leveling!"}
                          falseText={"Stones!"}/>
        </div>
      </div>
    );
  }

});

module.exports = Questions;
