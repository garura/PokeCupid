var React = require('react');
var PersonalityStore = require('../stores/poke_personality');
var MatchStore = require('../stores/match');
var SessionStore = require('../stores/session');
var apiUtil = require('../util/apiUtil');

var MatchInfo = React.createClass({

  getInitialState: function() {
    var matchInfo = MatchStore.find(this.props.match_id) || {};
    var userInfo = SessionStore.session() || {};
    return ({ matchInfo: matchInfo,
              userInfo: userInfo });
  },
  // update match store on mount

  componentDidMount: function() {
    this.sessionToken = SessionStore.addListener(this.updateUserInfo);
    this.matchToken = MatchStore.addListener(this.updateMatchInfo);
    // only need to getSessionInfo if no session store?
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
    debugger;
    this.setState({ matchInfo: MatchStore.find(this.props.match_id) });
  },

  render: function() {
    var rarecandy = '';
    var username = '';

    if (this.state.matchInfo.userInfo) {
      debugger;
      username = this.state.matchInfo.userInfo.username;
    }
    if (this.state.matchInfo.personality) {
      rarecandy = this.state.matchInfo.personality.rarecandy;
    }


    return (
      <div>
        <p>{username}</p>
        <p>{rarecandy}</p>
      </div>
    );
  }

});

module.exports = MatchInfo;
