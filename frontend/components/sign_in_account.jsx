var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var apiUtil = require('../util/apiUtil');
var ErrorStore = require('../stores/errors');

var SignInAccount = React.createClass({
  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      username: '',
      password: '',
      errors: []};
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
    this.context.router.push("home");
  },

  goToProfile: function() {
    this.context.router.push("profile");
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var userInfo = {
      user: {
        username: this.state.username,
        password: this.state.password
      }
    };
    // TODO change back to homepage?
    apiUtil.verifyUser(userInfo, this.goToProfile);
  },

  generateErrors: function() {
    var errors = this.state.errors.map(function(error, index) {
      return (<li key={index} className='formErrors'>{error}</li>);
    });

    if (errors.length == 0) {
      errors = (
        <div id='noUserErrors' className='lower'>
          <img id='totodile' src='http://cdn.bulbagarden.net/upload/d/df/158Totodile.png'></img>
          <ul>
          </ul>
        </div>
      );
    }
    else {
      errors = (
        <div id='errorMessage' className='lower'>
          <img id='totodile' src='http://cdn.bulbagarden.net/upload/d/df/158Totodile.png'></img>
          <ul className='userErrors'>
            {errors}
          </ul>
        </div>
      );
    }

    return errors;
  },

  render: function() {
    var errors = this.generateErrors();

    return (
      <div>
        <h3 id='slogan' >Sign In!</h3>
        <form className='accountInfoForm userInfoForm' onSubmit={this.handleSubmit}>
          <label id='username' >Username: <input type='text' valueLink={this.linkState('username')}/>
          </label>
          <br></br>
          <label id='password' >Password: <input type='password' valueLink={this.linkState('password')}/>
          </label>
          <br></br>
          <input id="signUp_confirm" className='account' type='submit' value='Sign In!'/>
        </form>
        {errors}
      </div>
    );
  }

});

module.exports = SignInAccount;
