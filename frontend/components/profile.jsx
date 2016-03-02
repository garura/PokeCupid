var React = require('react');
var SessionStore = require('../stores/session');

var Profile = React.createClass({

  getInitialState: function() {
    var user_info = SessionStore.session() || {};
    return ({ current_user: user_info, selected: 0 });
  },

  profileSubmit: function(event) {
    event.preventDefault();

    // MODAL? ?

    console.log("hi u clicked submit :)");
  },

  generateLabel: function() {
    if (this.state.current_user.type_two) {
      var label = this.state.current_user.type_one + "-" + this.state.current_user.type_two;
    }
    else {
      var label = this.state.current_user.type_one;
    }

    return (
      <a href="#" id='current_user_info'>
      <p id='profileName'>{this.state.current_user.username}Garura</p>
      <p>{Math.floor(this.state.current_user.age)}, {label}</p>
      <p>change your info!</p>
    </a>
    );
  },

  handleClick: function(event) {
    event.preventDefault();
    var selectedIndex = event.target.value;
    this.setState({selected: selectedIndex});
    // console.log(event.target.value);
    // debugger;
  },

  generateContentNav: function() {
    var selected = this.state.selected;

    return (
      <ul id='profileNav'>
        <li value="0" className={ selected === 0 ? "listy selected" : "listy" } id='about' onClick={this.handleClick}>About</li>
        <li value="1" className={ selected === 1 ? "listy selected" : "listy" } id='photos' onClick={this.handleClick}>Photos</li>
        <li value="2" className={ selected === 2 ? "listy selected" : "listy" } id='questions' onClick={this.handleClick}>Questions</li>
      </ul>
    );
  },

  render: function() {
    var user_label = this.generateLabel() || "";
    var contentNav = this.generateContentNav();

    return (
      <div id='profileDiv'>
        <img id='profilePic'
             src='http://k3.okccdn.com/media/img/user/placeholder_2013/pq_225.png'
             alt='Profile Picture'>
        </img>
        {user_label}
        {contentNav}
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = Profile;
