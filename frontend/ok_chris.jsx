var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var hashHistory = require('react-router').hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var QualityStore = require('./stores/quality.js');
var SignInQualityForm = require('./components/sign_in_quality_form');
var SessionStore = require('./stores/storage');
var SignInUserForm = require('./components/sign_in_user_form');
var Home = require('./components/home');

var App = React.createClass({
  render: function () {
    return(
      <div>
        <header><h1>OkChris</h1></header>
        {this.props.children}
      </div>
    );
  }
});


// valid_login
// onEnter={valid_login}
var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={SignInQualityForm}/>
    <Route path="user/new" component={SignInUserForm}/>
    <Route path="home" component={Home}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, document.getElementById('root'));
});
