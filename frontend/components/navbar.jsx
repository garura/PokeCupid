var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../stores/session');
var SignInActions = require('../actions/sign_in_actions');
var ErrorActions = require('../actions/error_actions');
var apiUtil = require('../util/apiUtil');

var NavBar = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    var session = SessionStore.session() || {id: null, username: ""}; // returns undefined if no current user
    return { current_user: session };
  },

  componentDidMount: function() {
    this.sessionListener = SessionStore.addListener(this._updateNav);
  },

  componentWillUnmount: function() {
    this.sessionListener.remove();
  },

  _updateNav: function() {
    var session = SessionStore.session() || {id: null, username: ""};
    this.setState({ current_user: session});
  },

  goToSignUpPage: function() {
    this.context.router.replace("/");
  },

  goToSignInPage: function() {
    this.context.router.replace("/signin");
  },

  signOut: function() {
    // clear session store
    SignInActions.clearSession();
    ErrorActions.clearErrors();
    SignInActions.sendPreferences([]);
    // go to sign up
    // ajax request to destroy session, reset localStorage
    apiUtil.logOutUser();
    this.goToSignUpPage();
  },

  signIn: function() {
    // clear error store
    ErrorActions.clearErrors();
    SignInActions.sendPreferences([]);
    // go to sign in page
    this.goToSignInPage();
  },

  signUp: function() {
    // clear error store
    ErrorActions.clearErrors();
    SignInActions.sendPreferences([]);
    // go to sign in page
    this.goToSignUpPage();
  },

  createSessionButton: function() {
    var text;
    var destination;
    if (window.location.hash.indexOf("signin") > -1) {
      text = "Sign Up!";
      destination = this.signUp;
    }
    else {
      text = "Sign In!";
      destination = this.signIn;
    }
    if (this.state.current_user.id) {
      return (<button type='button'
                      id='navBarButton'
                      onClick={this.signOut}>
              Sign Out!
              </button>
      );
    }
    else {
      return (<button type='button'
                      id='navBarButton'
                      onClick={destination}>
              {text}
              </button>
      );
    }
  },

  createSessionMessage: function() {
    var username = this.state.current_user.username;
    var text;
    if (window.location.hash.indexOf("signin") > -1) {
      text = "Don't have an account?";
    }
    else {
      text = "Have an account?";
    }
    if (username) {
      return (<p id='navBarMessage' onClick={this.goToProfile}>{username}</p>);
    }
    else {
      
    }
  },

  createMatchButton: function() {
    if (this.state.current_user.username) {
      return (<button type='button' id='matchButton' onClick={this.goToMatch}>My Matches</button>);
    }
  },

  goToMatch: function(event) {
    event.preventDefault();
    this.context.router.push("matches");
  },

  goToProfile: function(event) {
    event.preventDefault();
    this.context.router.push("profile/about");
  },

  homeButton: function(event) {
    event.preventDefault();
    if (this.state.current_user.username) {
      this.context.router.push("matches");
    }
    else {
      this.signUp();
    }

    // nav to either
  },

  render: function() {
    var sessionButton = this.createSessionButton();
    var navMessage = this.createSessionMessage();
    var matchButton = this.createMatchButton();

    return (
      <div className='tester'>

        <div id='navBarDiv'>
          {sessionButton}
          {navMessage}
          <h1 id='pokeCupidHeader' onClick={this.homeButton}>PokéCupid !</h1>
          {matchButton}
        </div>
      </div>

    );
  }

});

module.exports = NavBar;
