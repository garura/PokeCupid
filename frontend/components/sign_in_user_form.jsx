var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var apiUtil = require('../util/apiUtil');


var SignInUser = React.createClass({
  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      username: '',
      password: '',
      email: '',
      day: '',
      month: '',
      year: ''
    }
  },

  goToHomepage: function() {
    this.context.router.replace("/home");
  },

  validNumber: function(string) {
    for (var i = 0; i < string.length; i++) {
      if (!string[i].match(/[0-9]/)) {
        return false;
      }
    }
    return true;
  },

  handleSubmit: function(event) {
    event.preventDefault();
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
    if (year < 2017 && year > 1900) {
      year = true;
    }

    if (day && month && year) {
      var userInfo = { user: {username: this.state.username,
                              password: this.state.password,
                              email: this.state.email},
                       day: this.state.day,
                       month: this.state.month,
                       year: this.state.year
      };
      apiUtil.createUser(userInfo, this.goToHomepage);
    }
    else {
      // error store action
    }
  },

  render: function() {
    return (
      <div>
        <h3>Almost Done!</h3>
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
          <input type='submit' value='Sign Up!'/>
        </form>
      </div>
    );
  }

});

module.exports = SignInUser;
