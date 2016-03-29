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
    if (userInfo.id) {
      apiUtil.getUserMatches(userInfo.id);
    }
  },

  updateMatchInfo: function() {
    this.setState({ matchInfo: MatchStore.all() });
  },

  generateMatchList: function() {
    var that = this;

    // sort by % match
    var matches = Object.keys(this.state.matchInfo).sort(function(el1, el2) {
      if (that.state.matchInfo[el1].userInfo.points > that.state.matchInfo[el2].userInfo.points) {
        return -1;
      }
      else if (that.state.matchInfo[el1].userInfo.points < that.state.matchInfo[el2].userInfo.points) {
        return 1;
      }
      return 0;
    });

    matches = matches.map(function(match_id, index) {
      var username = that.state.matchInfo[match_id].userInfo.username;
      var age = that.state.matchInfo[match_id].userInfo.age
      age = Math.floor(age);
      var typeOne = that.state.matchInfo[match_id].userInfo.type_one;
      var typeTwo = that.state.matchInfo[match_id].userInfo.type_two;
      var points = Math.floor((that.state.matchInfo[match_id].userInfo.points / 6) * 100);
      var photo = that.state.matchInfo[match_id].userInfo.photo_url;
      return (
        <MatchIndexItem key={index} matchId={match_id} username={username} age={age} typeOne={typeOne} typeTwo={typeTwo} points={points} photoUrl ={photo}/>
      );
    });

    return matches;
  },

  render: function() {
    var matches = this.generateMatchList();
    if (matches.length === 0) {
      matches =
        <p id='noMatches'>
          No matches found. Have you answered any questions on your profile yet?
          <img id='cubone' src='https://pbs.twimg.com/media/CcMucU4W8AAKgb6.png'></img>
        </p>;
    }

    return (
      <div id='matchIndexDiv'>
        <p id='matchIndexHeader'>Your Matches:</p>
        {matches}
      </div>
    );
  }

});

module.exports = MatchIndex;
