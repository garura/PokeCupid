var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');
var ReactRouter = require('react-router');
var hashHistory = require('react-router').hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var QualityStore = require('./stores/quality.js');
var SessionStore = require('./stores/session');
var ErrorStore = require('./stores/errors');
var PreferenceStore = require("./stores/preferences");
var PersonalityStore = require('./stores/poke_personality');
var NavBar = require('./components/navbar');
var SignInQualityForm = require('./components/sign_in_quality_form');
var SignInUserForm = require('./components/sign_in_user_form');
var SignInAccountForm = require('./components/sign_in_account');
var SignInPreferencesForm = require('./components/sign_in_preference_form');
var Home = require('./components/home');
var Profile = require('./components/profile');
var About = require('./components/about');
var Photos = require('./components/photos');
var Questions = require('./components/questions');
var MatchIndex = require('./components/match_index');
var MatchInfo = require('./components/match_info');

var App = React.createClass({
  render: function () {
    return(
      <div>
        <NavBar />
        <div id='nonNavStuff'>
          {this.props.children}
        </div>
      </div>
    );
  }
});


// valid_login
// onEnter={valid_login}
// edit profile / show profile routes


function valid_login(nextState, replace) {
  if (!SessionStore.session().id && !window.localStorage.getItem('user_id')) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={SignInPreferencesForm}/>
    <Route path="user/new" component={SignInUserForm}/>
    <Route path="signin" component={SignInAccountForm}/>
    <Route path="new" component={SignInPreferencesForm}/>
    <Route path="home" component={Home} onEnter={valid_login}/>
    <Route path="matches" component={MatchIndex} onEnter={valid_login}/>
    <Route path="user/:id" component={MatchInfo} onEnter={valid_login}/>
    <Route path="profile" component={Profile} onEnter={valid_login}>
      <Route path="about" component={About} onEnter={valid_login}/>
      <Route path="photos" component={Photos} onEnter={valid_login}/>
      <Route path="questions" component={Questions} onEnter={valid_login}/>
    </Route>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  Modal.setAppElement(document.getElementById('root'));
  ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, document.getElementById('root'));
});
