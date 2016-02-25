var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var apiUtil = require('../util/apiUtil');

var SignInAccount = React.createClass({

  goToHomepage: function() {
    this.context.router.replace("/home");
  },

  handleSubmit: function() {
    var userInfo = {user: {username: this.state.username,
                           password: this.state.password}};
    apiUtil.verifyUser( userInfo, this.goToHomepage);
  },

  render: function() {
    return (
      <div>
        <h3>Sign In!</h3>
        <form className='accountInfoForm' onSubmit={this.handleSubmit}>
          <label>Username: <input type='text' valueLink={this.linkState('username')}/>
          </label>
          <br></br>
          <label>Password: <input type='password' valueLink={this.linkState('password')}/>
          </label>
          <input type='submit' value='Sign In!'/>
        </form>
      </div>
    );
  }

});

module.exports = SignInAccount;
