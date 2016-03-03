var SignInActions = require('../actions/sign_in_actions');
var ErrorActions = require('../actions/error_actions');
var PersonalityActions = require('../actions/personality_actions');

var apiUtil = {
  verifyUser: function(userInfo, callback) {
    $.ajax({
      url: "api/session",
      method: "POST",
      data: userInfo,
      success: function(session) {
        ErrorActions.clearErrors();
        SignInActions.sendSession(session);
        callback();
      },
      error: function(error) {
        var errors = JSON.parse(error.responseText).errors;
        ErrorActions.sendErrors(errors);
      }
    });
  },
  createUser: function(userInfo, callback) {
    $.ajax({
      url: "api/users",
      method: "POST",
      data: userInfo,
      success: function(session) {
        ErrorActions.clearErrors();
        SignInActions.clearPreferences();
        SignInActions.sendSession(session);
        callback();
      },
      error: function(error) {
        var errors = JSON.parse(error.responseText).errors;
        ErrorActions.sendErrors(errors);
      }
    });
  },
  getUserPersonality: function(userInfo) {
    var id = userInfo.id;
    $.ajax({
      url: "api/poke_personalities/" + id,
      method: "GET",
      success: function(personality) {
        PersonalityActions.sendPersonality(personality);
      }
    });
  },
  updateUserPersonality: function(userInfo, updatedInfo) {
    var id = userInfo.id;
    $.ajax({
      url: 'api/poke_personalities/' + id,
      method: 'PATCH',
      data: updatedInfo,
      success: function(personality) {
        PersonalityActions.sendPersonality(personality);
      }
    });
  },
  getUserPreferences: function(userInfo) {
    var id = userInfo.id;
    $.ajax({
      url: 'api/poke_preferences/' + id,
      method: 'GET',
      success: function(preferences) {
        var mapped = preferences.map(function(index) {
           return index['poke_type'];
        });
        debugger;
        SignInActions.sendPreferences(mapped);
      }
    });
  }
};

window.apiUtil = apiUtil;
module.exports = apiUtil;
