var AppDispatcher = require('../dispatcher/dispatcher.js');

module.exports = {
  sendResponse: function(response) {
    AppDispatcher.dispatch({
      actionType: "USER_RESPONSE",
      response: response
    });
  }
};
