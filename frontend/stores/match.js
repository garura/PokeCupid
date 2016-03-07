var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');


var _matches = {};
var MatchStore = new Store(AppDispatcher);

var resetMatches = function(matches) {
  _matches = matches;
};

var resetMatch = function(match) {
  _matches[match.id] = match;
};

MatchStore.find = function(id) {
  return _matches[id];
};

MatchStore.all = function() {
  return _matches;
};

MatchStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "ALL_MATCHES":
      resetMatches(payload.matches);
      MatchStore.__emitChange();
      break;
    case "ONE_MATCH":
      resetMatch(payload.match);
      MatchStore.__emitChange();
      break;
  }
};

module.exports = MatchStore;
