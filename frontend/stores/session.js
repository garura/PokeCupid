var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');


var _session = {id: null, username: ""};
var SessionStore = new Store(AppDispatcher);

SessionStore.session = function() {
  return _session;
};

var resetSession = function(session) {
  _session = session;
};

SessionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "GIVE_SESSION":
      resetSession(payload.session);
      SessionStore.__emitChange();
      break;
    case "CLEAR_SESSION":
      resetSession({id: null, username: ""});
      SessionStore.__emitChange();
      break;
  }
};

window.SessionStore = SessionStore;
module.exports = SessionStore;
