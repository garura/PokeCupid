var AppDispatcher = require('../dispatcher/dispatcher.js');

module.exports = {
  sendMatch: function(match) {
    AppDispatcher.dispatch({
      actionType: "ONE_MATCH",
      match: match
    });
  },
  sendMatches: function(matches) {
    AppDispatcher.dispatch({
      actionType: "ALL_MATCHES",
      matches: matches
    });
  }
};
