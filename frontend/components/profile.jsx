var React = require('react');
var SessionStore = require('../stores/session');
var apiUtil = require('../util/apiUtil');


var selected_values = {
  0: "profile/about",
  1: "profile/photos",
  2: "profile/questions"
};

// used to keep contentNav displayed correctly on refresh and re-entry
var routeParam = {
  "/profile/about": 0,
  "/profile/photos": 1,
  "/profile/questions": 2,
  "profile/about": 0,
  "profile/photos": 1,
  "profile/questions": 2
};


var Profile = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    var user_info = SessionStore.session() || {};
    var selected = routeParam[this.props.location.pathname];
    return ({ current_user: user_info, selected: selected });
  },

  componentDidMount: function() {
    this.sessionToken = SessionStore.addListener(this.updateInfo);
    var id = SessionStore.session().id || window.localStorage.getItem('user_id');
    apiUtil.getSessionInfo(id);
  },

  componentWillUnmount: function() {
    this.sessionToken.remove();
  },

  componentWillReceiveProps: function(newProps) {
    var selected = routeParam[newProps.location.pathname];
    this.setState({ selected: selected });
  },

  updateInfo: function() {
    this.setState({current_user: SessionStore.session()});
  },

  profileSubmit: function(event) {
    event.preventDefault();
  },

  generateLabel: function() {
    if (this.state.current_user.type_two) {
      var label = this.state.current_user.type_one + "-" + this.state.current_user.type_two;
    }
    else {
      var label = this.state.current_user.type_one;
    }

    return (
      <label onClick={this.savePic} id='current_user_info'>
        <p id='profileName'>{this.state.current_user.username}</p>
        <p>Level {Math.floor(this.state.current_user.age)}, {label}</p>
        <p>Change your photo!</p>
      </label>
    );
  },

  savePic: function(event) {
    event.preventDefault();
    var that = this;
    cloudinary.openUploadWidget(
      CLOUDINARY,
      function (error, result) {
        apiUtil.updateUserPicture(that.state.current_user.id, result[0].url);
      }
    );
  },

  handleClick: function(event) {
    event.preventDefault();
    var selected = event.target.value;
    this.setState({selected: selected});
    var path = selected_values[selected];
    this.context.router.push(path);
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
    var photo = this.state.current_user.photo_url;

    return (
      <div id='profileDiv'>
        <img id='profilePic'
             src={photo}
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
