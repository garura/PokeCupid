var AppDispatcher = require('../dispatcher/dispatcher.js');

module.exports = {
  sendQualities: function(qualities) {
    AppDispatcher.dispatch({
      actionType: "ALL_QUALITIES",
      qualities: qualities
    });
  },
  sendPreferences: function(preferences) {
    AppDispatcher.dispatch({
      actionType: "ALL_PREFERENCES",
      preferences: preferences
    });
  },
  sendSession: function(session) {
    AppDispatcher.dispatch({
      actionType: "GIVE_SESSION",
      session: session
    });
  },
  clearSession: function() {
    AppDispatcher.dispatch({
      actionType: "CLEAR_SESSION"
    });
  }
};
