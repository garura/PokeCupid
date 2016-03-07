var React = require('react');
var PersonalityStore = require('../stores/poke_personality');
var MatchStore = require('../stores/match');
var SessionStore = require('../stores/session');
var apiUtil = require('../util/apiUtil');
var MatchInfo = require('./match_info');
var MatchIndexItem = require('./match_index_item');

var MatchIndex = React.createClass({

  getInitialState: function() {
    var matchInfo = {};
    var userInfo = SessionStore.session() || {};
    return ({ matchInfo: matchInfo,
              userInfo: userInfo });
  },

  componentDidMount: function() {
    this.sessionToken = SessionStore.addListener(this.updateUserInfo);
    this.matchToken = MatchStore.addListener(this.updateMatchInfo);
    var id = SessionStore.session().id || window.localStorage.getItem('user_id');
    apiUtil.getSessionInfo(id);
  },

  componentWillUnmount: function() {
    this.sessionToken.remove();
    this.matchToken.remove();
  },

  updateUserInfo: function() {
    var userInfo = SessionStore.session();
    this.setState({ userInfo: userInfo });
    apiUtil.getUserMatches(userInfo.id);
  },

  updateMatchInfo: function() {
    this.setState({ matchInfo: MatchStore.all() });
  },

  generateMatchList: function() {
    var that = this;
    var matches = Object.keys(this.state.matchInfo).map(function(match_id, index) {
      var username = that.state.matchInfo[match_id].userInfo.username;
      var age = that.state.matchInfo[match_id].userInfo.age
      age = Math.floor(age);
      var typeOne = that.state.matchInfo[match_id].userInfo.type_one;
      var typeTwo = that.state.matchInfo[match_id].userInfo.type_two;
      var points = Math.floor((that.state.matchInfo[match_id].userInfo.points / 6) * 100);
      return (
        <MatchIndexItem key={index} matchId={match_id} username={username} age={age} typeOne={typeOne} typeTwo={typeTwo} points={points} />
      );
    });

    return matches;
  },

  render: function() {

    var matches = this.generateMatchList();

    return (
      <div id='matchIndexDiv'>
        <p id='matchIndexHeader'>Your Matches:</p>
        {matches}
      </div>
    );
  }

});

module.exports = MatchIndex;
