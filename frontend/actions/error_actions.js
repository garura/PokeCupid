var AppDispatcher = require('../dispatcher/dispatcher.js');

module.exports = {
  sendErrors: function(errors) {
    AppDispatcher.dispatch({
      actionType: "RECEIVE_ERRORS",
      errors: errors
    });
  },
  clearErrors: function() {
    AppDispatcher.dispatch({
      actionType: "CLEAR_ERRORS",
    });
  }
};
