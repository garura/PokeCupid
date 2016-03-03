var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');


var _personality = {};
var PersonalityStore = new Store(AppDispatcher);

PersonalityStore.personality = function() {
  return _personality;
};

var resetTraits = function(personality) {
  _personality = personality;
};

PersonalityStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "ALL_PERSONALITIES":
      resetTraits(payload.personality);
      PersonalityStore.__emitChange();
      break;
  }
};

module.exports = PersonalityStore;
