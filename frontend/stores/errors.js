var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');


var _errors = [];
var ErrorStore = new Store(AppDispatcher);

ErrorStore.all = function() {
  return _errors;
};

var resetErrors = function(errors) {
  _errors = errors;
};

ErrorStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "RECEIVE_ERRORS":
      resetErrors(payload.errors);
      break;
    case "CLEAR_ERRORS":
      resetErrors([]);
      break;
  }
};

module.exports = ErrorStore;
