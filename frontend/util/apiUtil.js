var SignInActions = require('../actions/sign_in_actions');
var ErrorActions = require('../actions/error_actions');

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
        var errors = JSON.parse(error.responseText);
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
        SignInActions.sendSession(session);
        callback();
      },
      error: function(error) {
        var errors = JSON.parse(error.responseText);
        ErrorActions.sendErrors(errors);
      }
    });
  }
};

window.apiUtil = apiUtil;
module.exports = apiUtil;
