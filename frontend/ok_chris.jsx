var React = require('react');
var ReactDOM = require('react-dom');
var QualityStore = require('./stores/quality.js');
var SignInForm = require('./components/sign_in_form');

var MyComponent = React.createClass({
  render: function () {
    return(
      <SignInForm />
    );
  }
})

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('root'));
});
