var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');


var _preferences = [];
var PreferenceStore = new Store(AppDispatcher);

PreferenceStore.all = function() {
  return _preferences;
};

var resetPreferences = function(preferences) {
  _preferences = preferences;
};

PreferenceStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "ALL_PREFERENCES":
      resetPreferences(payload.preferences);
      PreferenceStore.__emitChange();
      break;
  }
};

window.PreferenceStore = PreferenceStore;
module.exports = PreferenceStore;