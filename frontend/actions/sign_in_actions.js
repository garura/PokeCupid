var AppDispatcher = require('../dispatcher/dispatcher.js');

module.exports = {
  sendQualities: function(qualities) {
    AppDispatcher.dispatch({
      actionType: "ALL_QUALITIES",
      qualities: qualities
    });
  }
};
