var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');


var _qualities = {
  "orientation": [],
  "gender": []
};

var QualityStore = new Store(AppDispatcher);

QualityStore.all = function() {
  var qualities = [ [], [] ];

  _qualities["orientation"].forEach(function(orientation) {
    qualities[0].push(orientation);
  });

  _qualities["gender"].forEach(function(gender) {
    qualities[1].push(gender);
  });

  return qualities;
};

var resetQualities = function(qualities) {
  _qualities = {"orientation": [], "gender": []};

  qualities[0].forEach(function(orientation) {
    _qualities["orientation"].push(orientation);
  });
  qualities[1].forEach(function(gender) {
    _qualities["gender"].push(gender);
  });
};

QualityStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "ALL_QUALITIES":
      resetQualities(payload.qualities);
      QualityStore.__emitChange();
      break;
  }
};

window.QualityStore = QualityStore;
module.exports = QualityStore;
