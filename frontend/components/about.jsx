var React = require('react');
var PersonalityStore = require('../stores/poke_personality');
var SessionStore = require('../stores/session');
var apiUtil = require('../util/apiUtil');
var AboutDetail = require('./about_detail');
var LookingFor = require('./looking_for');
var MyDetails = require('./my_details');

var About = React.createClass({

  getInitialState: function() {
    return ({ personality: PersonalityStore.personality(),
              userInfo: SessionStore.session()});
  },

  componentDidMount: function() {
    this.pokePersonalityToken = PersonalityStore.addListener(this.updateInfo);
    this.sessionToken = SessionStore.addListener(this.updateUserInfo);
    var id = SessionStore.session().id || window.localStorage.getItem('user_id');
    // update session (updates props for AboutDetail) -> update personality (updates store for LookingFor)
    apiUtil.getSessionInfo(id);
  },

  componentWillUnmount: function() {
    this.pokePersonalityToken.remove();
    this.sessionToken.remove();
  },

  updateUserInfo: function() {
    var userInfo = SessionStore.session();
    this.setState({userInfo: userInfo})
    apiUtil.getUserPersonality(userInfo);
  },

  updateInfo: function() {
    this.setState({ personality: PersonalityStore.personality()});
  },

  render: function() {
    return (
      <div id='aboutDiv'>
        <div id='aboutLeft'>
          <AboutDetail  message='My self-summary'
                        subtext={this.state.personality.summary}
                        defaultText='Write a little about yourself. Just a paragraph will do.'
                        updateParameter='summary'/>

          <AboutDetail  message='What I’m doing with my life'
                        subtext={this.state.personality.daily}
                        defaultText='Don’t overthink this one; tell us what you’re doing day-to-day.'
                        updateParameter='daily' />

          <AboutDetail  message='I’m really good at'
                        subtext={this.state.personality.skills}
                        defaultText='Go on, brag a little (or a lot). We won’t judge.'
                        updateParameter='skills' />

          <AboutDetail  message='Favorites'
                        subtext={this.state.personality.favorites}
                        defaultText='Help your potential matches find common interests.'
                        updateParameter='favorites' />

          <AboutDetail  message='One thing I could never do without'
                        subtext={this.state.personality.six}
                        defaultText='Think outside the box. Sometimes the little things can say a lot.'
                        updateParameter='six' />

          <AboutDetail  message='On a typical Friday night I am'
                        subtext={this.state.personality.friday}
                        defaultText='Training and takeout, or getting your party on — how do you let loose?'
                        updateParameter='friday' />

          <AboutDetail  message='You should message me if'
                        subtext={this.state.personality.message}
                        defaultText='Offer a few tips to help matches win you over.'
                        updateParameter='message' />
        </div>
        <div id='aboutRight'>
          <LookingFor />
          <MyDetails />
        </div>
      </div>
    );
  }

});

module.exports = About;
