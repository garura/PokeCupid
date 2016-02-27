var React = require('react');
var SignInActions = require('../actions/sign_in_actions');


var pokeTypes = {
  "Normal": true,
  "Fighting": true,
  "Flying": true,
  "Poison": true,
  "Ground": true,
  "Rock": true,
  "Bug": true,
  "Ghost": true,
  "Steel": true,
  "Fire": true,
  "Water": true,
  "Grass": true,
  "Electric": true,
  "Psychic": true,
  "Ice": true,
  "Dragon": true,
  "Dark": true,
  "Fairy": true
};

var SignInPreferences = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      "Normal": true,
      "Fighting": false,
      "Flying": false,
      "Poison": false,
      "Ground": false,
      "Rock": false,
      "Bug": false,
      "Ghost": false,
      "Steel": false,
      "Fire": false,
      "Water": false,
      "Grass": false,
      "Electric": false,
      "Psychic": false,
      "Ice": false,
      "Dragon": false,
      "Dark": false,
      "Fairy": false
    };
  },

  handleClicked: function(event) {
    event.preventDefault();
    key = event.target.value;
    value = !(this.state[key]);
    this.setState({[key]: value});
  },

  sendPreferences: function() {
    var preferences = [];
    var that = this;

    Object.keys(this.state).forEach(function(key) {
      if (pokeTypes[key] && that.state[key]) {
        preferences.push(key);
      }
    });

    if (preferences[0]) {  // at least one type selected
      SignInActions.sendPreferences(preferences);
      this.context.router.push("user/new");
    }
    else {
      this.setState({errors: "Please select at least one type."});
    }
  },

  generateButtons: function() {
    var that = this;

    var typeButtons = Object.keys(that.state).map(function(key, index) {
      return (
        <button type="button"
                key={index}
                className={"button_" + key + " button_" + that.state[key]}
                onClick={that.handleClicked}
                value={key}>{key}
        </button>
      );
    });

    return typeButtons;
  },

  render: function() {
    var errors = this.state.errors;
    var buttons = this.generateButtons();

    return(
      <div>
        <h3>Join the best dating site for Pokémon on Earth.</h3>
        <br></br>
        <h5>{errors}</h5>
        <p>I'm <img id='seaking' src="http://cdn.bulbagarden.net/upload/thumb/6/6a/119Seaking.png/250px-119Seaking.png"
          alt='Seeking'></img> (seeking)</p>
        <br></br>
        {buttons}
        <br></br>
        <button type="button"
                id="signUp_preferences_confirm"
                onClick={this.sendPreferences}>
                Continue
        </button>
      </div>
    );
  }

});

module.exports = SignInPreferences;
