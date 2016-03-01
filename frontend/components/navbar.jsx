var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../stores/session');
var SignInActions = require('../actions/sign_in_actions');
var ErrorActions = require('../actions/error_actions');

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
      return (<p id='navBarMessage'>{username}</p>);
    }
    else {
      return (<p id='navBarMessage'>{text}</p>)
    }
  },

  render: function() {
    var sessionButton = this.createSessionButton();
    var navMessage = this.createSessionMessage();

    return (
      <div className='tester'>

        <div id='navBarDiv'>
          {navMessage}
          {sessionButton}
          <header ><h1 id='pokeCupidHeader'>PokéCupid !</h1></header>
        </div>
      </div>

    );
  }

});

module.exports = NavBar;
