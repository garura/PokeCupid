var React = require('react');
var PersonalityStore = require('../stores/poke_personality');

var MyDetails = React.createClass({

  getInitialState: function() {
    return ({ personality: PersonalityStore.personality() });
  },

  componentDidMount: function() {
    this.personalityToken = PersonalityStore.addListener(this.updatePersonality);
  },

  componentWillUnmount: function() {
    this.personalityToken.remove();
  },

  updatePersonality: function() {
    this.setState({ personality: PersonalityStore.personality() });
  },


  render: function() {
    if (this.state.personality.caught !== undefined) {
      var caught = (<p><span>Caught:</span> {this.state.personality.caught.toString()}</p>);
    }
    if (this.state.personality.caught !== undefined) {
      var pokerus = (<p><span>Had/Have Pokérus:</span> {this.state.personality.pokerus.toString()}</p>);
    }


    return (
      <div>
        <p>My details</p>
        {caught}
        <p><span>Use Rarecandy:</span> {this.state.personality.rarecandy}</p>
        {pokerus}
      </div>
    );
  }

});

module.exports = MyDetails;
