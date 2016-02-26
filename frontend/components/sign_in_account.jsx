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

  handleSubmit: function(event) {
    event.preventDefault();
    var userInfo = {
      user: {
        username: this.state.username,
        password: this.state.password
      }
    };

    apiUtil.verifyUser(userInfo, this.goToHomepage);
  },

  render: function() {
    var errors = this.state.errors.map(function(error, index) {
      return (<li key={index} className='formErrors'>{error}</li>);
    });
    return (
      <div>
        <h3>Sign In!</h3>
        <ul>
          {errors}
        </ul>
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
