var React = require('react');
var SessionStore = require('../stores/session');

var Profile = React.createClass({

  getInitialState: function() {
    var user_info = SessionStore.session() || {};
    return ({ current_user: user_info });
  },

  profileSubmit: function(event) {
    event.preventDefault();

    // MODAL? ?

    console.log("hi u clicked submit :)");
  },

  generateLabel: function() {
    if (this.state.current_user.type_two) {
      // var label = <p>{</p>this.state.current_user.type_one}-{this.state.current_user.type_two}</p>;
      var label = this.state.current_user.type_one + "-" + this.state.current_user.type_two;
    }
    else {
      // var label = (<p>{this.state.current_user.type_one}</p>);
      var label = this.state.current_user.type_one;
    }

    return (
      <form id='current_user_info' onSubmit={this.profileSubmit}>
      <p>{this.state.current_user.username}</p>
      <p>{Math.floor(this.state.current_user.age)}, {label}</p>
      <input type='submit' value='change your info!' />
    </form>
    );
  },

  render: function() {

    var user_label = this.generateLabel() || "";

    return (
      <div id='profileDiv'>
        <img id='profilePic'
             src='http://k3.okccdn.com/media/img/user/placeholder_2013/pq_225.png'
             alt='Profile Picture'>
        </img>
        {user_label}
      </div>
    );
  }

});

module.exports = Profile;
