var React = require('react');
var PersonalityStore = require('../stores/poke_personality');
var PreferenceStore = require('../stores/preferences');
var SessionStore = require('../stores/session');
var apiUtil = require('../util/apiUtil');

var LookingFor = React.createClass({

  getInitialState: function() {
    return ({ preferences: PreferenceStore.all(),
              personality: PersonalityStore.personality()
           });
  },

  componentDidMount: function() {
    this.personalityToken = PersonalityStore.addListener(this.updatePersonality);
    this.preferencesToken = PreferenceStore.addListener(this.updatePreferences);
    apiUtil.getUserPreferences(SessionStore.session());
  },

  componentWillUnmount: function() {
    this.personalityToken.remove();
    this.preferencesToken.remove();
  },

  updatePersonality: function() {
    this.setState({personality: PersonalityStore.personality()});
  },

  updatePreferences: function() {
    this.setState({preferences: PreferenceStore.all()});
  },

  generateTypeList: function() {
    var types = this.state.preferences.map(function(poke_type, index) {
      return (<li key={index} className='typeLI'>{poke_type}</li>);
    });
    types = (<ul>Types:{types}</ul>);

    return types;
  },

  generateSeeking: function() {
    var seeking = [];
    if (this.state.personality.battling) {
      seeking.push("battling");
    }
    if (this.state.personality.friendship) {
      seeking.push("friendship");
    }
    if (this.state.personality.breeding) {
      seeking.push("breeding");
    }
    seeking.join(", ");
    if (seeking) {
      seeking = <p>For {seeking}</p>;
    }

    return seeking;
  },

  render: function() {
    var types = this.generateTypeList();
    var seeking = this.generateSeeking();

    // could return this in a click thing
    return (
      <div>
        <p>I'm looking for</p>
        {types}
        <p>Levels {this.state.personality.min_level}-{this.state.personality.max_level}</p>
        {seeking}
      </div>
    );
  }

});

module.exports = LookingFor;
