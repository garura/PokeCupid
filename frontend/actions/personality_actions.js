var AppDispatcher = require('../dispatcher/dispatcher.js');

module.exports = {
  sendPersonality: function(personality) {
    AppDispatcher.dispatch({
      actionType: "ALL_PERSONALITIES",
      personality: personality
    });
  }
};
