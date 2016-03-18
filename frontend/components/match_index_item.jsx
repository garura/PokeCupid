var React = require('react');

var MatchIndexItem = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    var username = this.props.username;
    var age = this.props.age;
    var typeOne = this.props.typeOne;
    var typeTwo = this.props.typeTwo;
    var matchId = this.props.matchId;
    var points = this.props.points;
    var photo = this.props.photoUrl;
    return ({
      matchId: matchId,
      username: username,
      age: age,
      typeOne: typeOne,
      typeTwo: typeTwo,
      points: points,
      photo: photo
    });
  },

  componentWillReceiveProps: function(newProps) {
    var username = newProps.username;
    var age = newProps.age;
    var typeOne = newProps.typeOne;
    var typeTwo = newProps.typeTwo;
    var photo_url = newProps.photoUrl;
    // why this.props instead of newProps?
    var matchId = newProps.matchId;
    var points = newProps.points;

    // var matchId = this.props.matchId;
    // var points = this.props.points;
    this.setState({
      matchId: matchId,
      username: username,
      age: age,
      typeOne: typeOne,
      typeTwo: typeTwo,
      points: points,
      photo_url: photo_url
    });
  },

  goToProfile: function(event) {
    event.preventDefault();
    var path = 'user/' + this.state.matchId;
    this.context.router.push(path);
  },

  render: function() {
    var types = this.state.typeOne;
    if (this.state.typeTwo) {
      types += ("-" + this.state.typeTwo);
    }

    return (
      <div className='matchIndexItemDiv'>
        <img className='matchIndexPic'
             src={this.state.photo}
             alt='Profile Picture'>
        </img>
        <div className='matchIndexItemUser'>
          <p className='matchIndexItemName'>{this.state.username}</p>
          <br></br>
          <p className='matchIndexItemInfo'>Level {this.state.age}, {types} Type</p>
        </div>
        <div className='matchIndexItemNav'>
          <p className='matchIndexItemPercent'>Percent Match: {this.state.points}%</p>
          <button className='matchIndexItemButton' onClick={this.goToProfile}>See their profile!</button>
        </div>

      </div>
    );
  }
});

module.exports = MatchIndexItem;
