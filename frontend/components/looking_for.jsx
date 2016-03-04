var React = require('react');
var Modal = require('react-modal');
var PersonalityStore = require('../stores/poke_personality');
var PreferenceStore = require('../stores/preferences');
var SessionStore = require('../stores/session');
var apiUtil = require('../util/apiUtil');

const customStyles = {
  content : {
    top                   : '55%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding               : '0px',
  }
};

var LookingFor = React.createClass({

  getInitialState: function() {
    var personality = PersonalityStore.personality();
    var min_level = personality.min_level;
    var max_level = personality.max_level;
    var battling = personality.battling;
    var friendship = personality.friendship;
    var breeding = personality.breeding;
    var preferences = PreferenceStore.all();

    var seekingTypes = {
      "Normal": false,
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

    preferences.forEach(function(type) {
      seekingTypes[type] = true;
    });

    return ({ preferences: PreferenceStore.all(),
              personality: personality,
              min_level: min_level,
              max_level: max_level,
              battling: battling,
              friendship: friendship,
              breeding: breeding,
              modalIsOpen: false,
              seekingTypes: seekingTypes
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

  openModal: function() {
    this.setState({ modalIsOpen: true });
  },

  closeModal: function() {
    this.setState({ modalIsOpen: false });
  },

  updatePersonality: function() {
    var personality = PersonalityStore.personality();
    var min_level = personality.min_level;
    var max_level = personality.max_level;
    var battling = personality.battling;
    var friendship = personality.friendship;
    var breeding = personality.breeding;
    this.setState({ personality: personality,
                    min_level: min_level,
                    max_level: max_level,
                    battling: battling,
                    friendship: friendship,
                    breeding: breeding
    });
  },

  updatePreferences: function() {
    var preferences = PreferenceStore.all();
    var seekingTypes = {
      "Normal": false,
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

    preferences.forEach(function(type) {
      seekingTypes[type] = true;
    });
    this.setState({preferences: preferences,
                   seekingTypes: seekingTypes});

  },

  battling: function(event) {
    event.preventDefault();
    var battling = !this.state.battling;
    this.setState({battling: battling});
  },

  friendship: function(event) {
    event.preventDefault();
    var friendship = !this.state.friendship;
    this.setState({friendship: friendship});
  },

  breeding: function(event) {
    event.preventDefault();
    var breeding = !this.state.breeding;
    this.setState({breeding: breeding});
  },

  saveDetails:function(event) {
    event.preventDefault();
    var that = this;
    var userInfo = SessionStore.session();

    var updateInfo = {
      personality: {
        min_level: this.state.min_level,
        max_level: this.state.max_level,
        battling: this.state.battling,
        friendship: this.state.friendship,
        breeding: this.state.breeding,
    }};
    apiUtil.updateUserPersonality(userInfo, updateInfo);

    var preferences = [];
    Object.keys(this.state.seekingTypes).map(function(type) {
      if (that.state.seekingTypes[type]) {
        preferences.push(type);
      }
    });
    preferences = {preferences: preferences};
    apiUtil.updateUserPreferences(userInfo, preferences);
    this.closeModal();
  },

  generateButtons: function() {
    var that = this;

    var typeButtons = Object.keys(that.state.seekingTypes).map(function(key, index) {
      return (
        <button type="button"
                key={index}
                className={"button_" + key + " button_" + that.state.seekingTypes[key]}
                onClick={that.typeClicked}
                value={key}>{key}
        </button>
      );
    });

    return typeButtons;
  },

  typeClicked: function(event) {
    event.preventDefault();
    var key = event.target.value;
    var seekingTypes = this.state.seekingTypes;
    seekingTypes[key] = !seekingTypes[key];
    this.setState({seekingTypes: seekingTypes});
  },

  generateTypeList: function() {
    var types = this.state.preferences.map(function(poke_type, index) {
      return (<li key={index} className='lookingForTypes'>{poke_type}</li>);
    });
    types = (<ul >Types:{types}</ul>);
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
    seeking = seeking.join(", ");
    if (seeking) {
      seeking = <li><p id='lookingForSeeking'>For {seeking}</p></li>;
      return seeking;
    }
  },

  setLevels: function(event) {
    event.preventDefault();
    var min = parseInt(this.refs.min.value);
    var max = parseInt(this.refs.max.value);
    if (!min || min < 18 || min > 100) {
      min = 18;
    }
    if (!max || max < 18 || max > 100) {
      max = min + 1;
    }
    if (max < min) { // swap values
      min = min + max;
      max = min - max;
      min = min - max;
    }
    this.refs.min.value = min;
    this.refs.max.value = max;
    this.setState({min_level: min, max_level: max});
  },

  render: function() {
    var types = this.generateTypeList();
    var seeking = this.generateSeeking();

    var battling = this.state.battling ? " isValue" : "";
    var friendship = this.state.friendship ? " isValue" : "";
    var breeding = this.state.breeding ? " isValue" : "";

    var buttons = this.generateButtons();

    // could return this in a click thing

    return (
      <div id='lookingForDiv' onClick={this.openModal}>
        <p id='lookingForHeader'>I'm looking for <span id='LFSpan'><img className='pencil' src='./assets/pencil.png'></img></span></p>
        <ul id='lookingForList'>
          <li>{types}</li>
          <li><p id='lookingForLevels'>Levels {this.state.personality.min_level}-{this.state.personality.max_level}</p></li>
          {seeking}
        </ul>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <div id='myDetailModalHeader'>
            <p id='modalHeader'>Who are you looking for?</p>
            <button id='modalClose' onClick={this.closeModal}>x</button>
          </div>
          <div id='myDetailInnerModalDiv'>
            <p className='typeQuestion'>Which types are you interested in?</p>
            <div id='modalType_buttons'>{buttons}</div>
            <br></br>
            <p className='modalQuestion'>Levels</p>
            <input className='levelInput' maxLength={3} type='text' ref='min' defaultValue={this.state.min_level} onBlur={this.setLevels}></input>
            <p id='levelDash'>to</p>
            <input className='levelInput' maxLength={3} type='text' ref='max' defaultValue={this.state.max_level} onBlur={this.setLevels}></input>
            <br></br>
            <p className='modalQuestion'>For</p>
            <button className={'modalButton' + battling} onClick={this.battling}>Battling</button>
            <button className={'modalButton' + friendship} onClick={this.friendship}>Friendship</button>
            <button className={'modalButton' + breeding} onClick={this.breeding}>Breeding</button>
            <br></br>
            <button className='aboutTextConfirm' type='button' onClick={this.saveDetails}>Save</button>
            <button className='aboutTextCancel' type='button' onClick={this.closeModal}>Cancel</button>
          </div>
        </Modal>
      </div>
    );
  }

});

module.exports = LookingFor;
