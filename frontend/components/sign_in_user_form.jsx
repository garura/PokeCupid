var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var apiUtil = require('../util/apiUtil');
var ErrorActions = require('../actions/error_actions');

// var pokeTypes = {
//   "Normal": true,
//   "Fighting": true,
//   "Flying": true,
//   "Poison": true,
//   "Ground": true,
//   "Rock": true,
//   "Bug": true,
//   "Ghost": true,
//   "Steel": true,
//   "Fire": true,
//   "Water": true,
//   "Grass": true,
//   "Electric": true,
//   "Psychic": true,
//   "Ice": true,
//   "Dragon": true,
//   "Dark": true,
//   "Fairy": true
// };

var pokeTypes = [
  "Normal",
  "Fighting",
  "Flying",
  "Poison",
  "Ground",
  "Rock",
  "Bug",
  "Ghost",
  "Steel",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Psychic",
  "Ice",
  "Dragon",
  "Dark",
  "Fairy"
];

var SignInUser = React.createClass({
  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    this.selectCount = 0;
    return {
      username: '',
      password: '',
      email: '',
      day: '',
      month: '',
      year: '',
      type_one: null,
      type_two: null,
      errors: [],
      typeErrors: ""
    }
  },

  componentDidMount: function() {
    this.errorToken = ErrorStore.addListener(this._errorsUpdated);
  },

  componentWillUnmount: function() {
    this.errorToken.remove();
  },

  _errorsUpdated: function() {
    this.setState({errors: ErrorStore.all()});
  },

  goToHomepage: function() {
    this.context.router.push("/home");
  },

  validNumber: function(string) {
    for (var i = 0; i < string.length; i++) {
      if (!string[i].match(/[0-9]/)) {
        return false;
      }
    }
    return true;
  },

  validDates: function() {
    var day = this.state.day;
    var month = this.state.month;
    var year = this.state.year;

    if (this.validNumber(day)) {
      day = parseInt(day);
    }
    if (this.validNumber(month)) {
      month = parseInt(month);
    }
    if (this.validNumber(year)) {
      year = parseInt(year);
    }

    if (day > 0 && day < 32) {
      day = true;
    }
    if (month > 0 && month < 13) {
      month = true;
    }
    if (year < 2017) {
      year = true;
    }
    return (day === true && month === true && year === true)
  },

  generateErrors: function() {
    var basicErrors = [];
    if (!this.state.username) {
      basicErrors.push("Username can't be blank");
    }
    if (!this.state.email) {
      basicErrors.push("Email can't be blank");
    }
    if (this.state.password.length < 6) {
      basicErrors.push("Password is too short (minimum is 6 characters)");
    }
    basicErrors.push("Birthday invalid. Must be at least level 18");
    if (!this.state.type_one) {
      basicErrors.push("Type one can't be blank");
    }

    return basicErrors;
  },

  handleSubmit: function(event) {
    event.preventDefault();

    if (this.validDates()) {
      var userInfo = {
        user: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          type_one: this.state.type_one,
          type_two: this.state.type_two
        },
        day: this.state.day,
        month: this.state.month,
        year: this.state.year
      };
      apiUtil.createUser(userInfo, this.goToHomepage);
    }
    else {
      var errors = this.generateErrors();
      ErrorActions.sendErrors(errors);
    }
  },

  generateButtons: function() {
    var that = this;

    var typeButtons = pokeTypes.map(function(key, index) {
      if (that.state.type_one == key || that.state.type_two == key) {
        var name = "button_true";
      }
      else {
        var name = "button_false";
      }
      return (
        <button type='button'
                key={index}
                id={'button_' + key}
                className={name}
                onClick={that.handleClicked}
                value={key}>{key}
        </button>
      );
    });
    return typeButtons;
  },

  handleClicked: function(event) {
    event.preventDefault();
    var value = event.target.value;
    if (this.selectCount == 0) { // no types chosen yet
      this.setState({type_one: value})
      this.selectCount++;
    }
    else if (this.selectCount == 1) {
      if (this.state.type_one === value) { // clicking chosen
        this.setState({type_one: null});
        this.selectCount--;
      }
      else {
        this.setState({type_two: value}); // clicking unchosen
        this.selectCount++;
      }
    }
    else if (this.selectCount === 2) {
      if (this.state.type_one === value) {
        var newFirstType = this.state.type_two;
        this.setState({type_one: newFirstType});
        this.setState({type_two: null});
        this.selectCount--;
        this.setState({typeErrors: null});
      }
      else if (this.state.type_two === value) {
        this.setState({type_two: null});
        this.selectCount--;
        this.setState({typeErrors: null});
      }
      else {
        if (this.state.typeErrors === "") {
          this.setState({typeErrors: "Maximum of two types!"});
        }
      }
    }
  },

  render: function() {
    var errors = this.state.errors.map(function(error, index) {
      return (<li key={index} className='formErrors'>{error}</li>);
    });
    var buttons = this.generateButtons();
    return (
      <div>
        <h3>Almost Done!</h3>
        <ul>
          {errors}
        </ul>
        <form className='userInfoForm' onSubmit={this.handleSubmit}>
          <label>Username: <input type='text' valueLink={this.linkState('username')}/>
          </label>
          <br></br>
          <label>Password: <input type='password' valueLink={this.linkState('password')}/>
          </label>
          <br></br>
          <label>Email: <input type='text' valueLink={this.linkState('email')}/>
          </label>
          <br></br>
          <label>Birthdate: <input type='text' placeholder='MM' maxLength="2" valueLink={this.linkState('month')}/>
                            <input type='text' placeholder='DD' maxLength="2" valueLink={this.linkState('day')}/>
                            <input type='text' placeholder='YYYY' maxLength="4" valueLink={this.linkState('year')}/>
          </label>
          <br></br>
          <label>Your Type(s):</label>
          {buttons}
          <br></br>
          <p id='typeErrors'>{this.state.typeErrors}</p>
          <br></br>
          <input type='submit' value='Sign Up!'/>
        </form>
      </div>
    );
  }

});

module.exports = SignInUser;
