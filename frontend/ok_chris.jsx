var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var hashHistory = require('react-router').hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var QualityStore = require('./stores/quality.js');
var SessionStore = require('./stores/session');
var ErrorStore = require('./stores/errors');
var PreferenceStore = require("./stores/preferences");
var NavBar = require('./components/navbar');
var SignInQualityForm = require('./components/sign_in_quality_form');
var SignInUserForm = require('./components/sign_in_user_form');
var SignInAccountForm = require('./components/sign_in_account');
var SignInPreferencesForm = require('./components/sign_in_preference_form');
var Home = require('./components/home');

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
var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={SignInPreferencesForm}/>
    <Route path="user/new" component={SignInUserForm}/>
    <Route path="home" component={Home}/>
    <Route path="signin" component={SignInAccountForm}/>
    <Route path="new" component={SignInPreferencesForm}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, document.getElementById('root'));
});
