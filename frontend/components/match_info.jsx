var React = require('react');
var PersonalityStore = require('../stores/poke_personality');
var MatchStore = require('../stores/match');
var SessionStore = require('../stores/session');
var apiUtil = require('../util/apiUtil');

var MatchInfo = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    var matchInfo = {};
    var userInfo = SessionStore.session() || {};
    return ({ matchInfo: matchInfo,
              userInfo: userInfo });
  },

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
    this.setState({ matchInfo: MatchStore.find(this.props.params.id) });
  },

  render: function() {
    if (this.state.matchInfo.userInfo) {
      var info = this.state.matchInfo;
      var username = info.userInfo.username;
      var age = Math.floor(info.userInfo.age);
      var types = info.userInfo.type_one;
      if (info.userInfo.type_two) {
        types += ("-" + info.userInfo.type_two);
      }
      var summary = info.personality.summary || "No user input.";
      var daily = info.personality.daily || "No user input.";
      var skills = info.personality.skills || "No user input.";
      var favorites = info.personality.favorites || "No user input.";
      var six = info.personality.six || "No user input.";
      var friday = info.personality.friday || "No user input.";
      var message = info.personality.message || "No user input.";
      var min_level = info.personality.min_level;
      var max_level = info.personality.max_level;

      var battling = info.personality.battling;
      var friendship = info.personality.friendship;
      var breeding = info.personality.breeding;

      var seeking = [];
      if (battling) {
        seeking.push("battling");
      }
      if (friendship) {
        seeking.push("friendship");
      }
      if (breeding) {
        seeking.push("breeding");
      }
      seeking = seeking.join(", ");
      if (seeking) {
        seeking = "For " + seeking;
      }
      else {
        seeking = "";
      }
      var profilePicture = info.userInfo.photo_url;
      var rarecandy = info.personality.rarecandy;
      var pokerus = info.personality.pokerus ? "Yes" : "No";
      var caught = info.personality.caught ? "Yes" : "No";
    }

    return (
      <div id='userInfoPage'>
        <div id='userProfileInfo'>
          <img id='profilePic'
               src={profilePicture}
               alt='Profile Picture'>
          </img>
          <div id='userProfileText'>
            <p id='userProfileUsername'>{username}</p>
            <br></br>
            <p id='userProfileAge'>Level {age}, {types} Type</p>
          </div>
        </div>
        <div id='userTextInfo'>
          <p className='userInfoPrompt'>My self-summary</p>
          <p className='userInfoResponse'>{summary}</p>
          <br></br>
          <p className='userInfoPrompt'>What I'm doing with my life</p>
          <p className='userInfoResponse'>{daily}</p>
          <br></br>
          <p className='userInfoPrompt'>I'm really good at</p>
          <p className='userInfoResponse'>{skills}</p>
          <br></br>
          <p className='userInfoPrompt'>Favorites</p>
          <p className='userInfoResponse'>{favorites}</p>
          <br></br>
          <p className='userInfoPrompt'>One thing I could never do without</p>
          <p className='userInfoResponse'>{six}</p>
          <br></br>
          <p className='userInfoPrompt'>On a typical Friday night I am</p>
          <p className='userInfoResponse'>{friday}</p>
          <br></br>
          <p className='userInfoPrompt'>You should message me if</p>
          <p className='userInfoResponse'>{message}</p>
          <br></br>
        </div>
        <div id='userPersonalityInfo'>
          <p id='userPersonalityHeader'>Details</p>
          <p className='userPersonalityDetail'>Looking for Pokémon levels {min_level} to {max_level}</p>
          <p className='userPersonalityDetail'>{seeking}</p>
          <p className='userPersonalityDetail'>Caught: {caught}</p>
          <p className='userPersonalityDetail'>Uses Rarecandy: {rarecandy}</p>
          <p className='userPersonalityDetail'>Pokérus: {pokerus}</p>
        </div>
      </div>
    );
  }

});

module.exports = MatchInfo;
