var React = require('react');
var MatchInfo = require('./match_info');

var MatchIndex = React.createClass({

  render: function() {
    return (
      <div>
        <MatchInfo match_id={2} />
      </div>
    );
  }

});

module.exports = MatchIndex;
