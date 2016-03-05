var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');


var _response = [];
var ResponseStore = new Store(AppDispatcher);

ResponseStore.response = function() {
  var responseString = "";
  for (var i = 0; i < 6; i++) {
    if (_response[i] !== undefined) {
      responseString += _response[i];
    }
  }
  return responseString;
};

var _resetResponse = function(response) {
  _response = response;
};

ResponseStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "USER_RESPONSE":
      _resetResponse(payload.response);
      ResponseStore.__emitChange();
      break;
  }
};

window.ResponseStore = ResponseStore;
module.exports = ResponseStore;
