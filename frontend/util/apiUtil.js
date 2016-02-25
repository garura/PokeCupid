var SignInActions = require('../actions/sign_in_actions');

var apiUtil = {
  verifyUser: function(userInfo, callback) {
    $.ajax({
      url: "api/session",
      method: "POST",
      data: userInfo,
      success: function(session) {
        SignInActions.sendSession(session);
        callback();
      },
      error: function(error) {
        // error store error json from session controller
      }
    });
  },
  createUser: function(userInfo, callback) {
    $.ajax({
      url: "api/users",
      method: "POST",
      data: userInfo,
      success: function(session) {
        SignInActions.sendSession(session);
        callback(); // change history stuff
      },
      error: function(error) {
        // update error store with error json info from UsersController
      }
    });
  }
};

window.apiUtil = apiUtil;
module.exports = apiUtil;
