/* global Backbone, Marionette, $, require */

$(function() {

  "use strict";

  var app = new Marionette.Application();

  var loggedInUser = new Backbone.Model();
  
  // View for login info (tracks logged in user)
  var TopToolbarView = Marionette.ItemView.extend({
    tagName: "div",
    id: "topToolbar",
    model: loggedInUser,
    template: require("../templates/toolbar-top.html"),
    events: {
    }
  });

  var LoginForm = Marionette.ItemView.extend({
    template: require("../templates/login-form.html"),
    id: "loginForm",
    events: {
      "click button": "login"
    },
    login: function() {
      this.triggerMethod("login");
    }
  });

  // Overall layout, with top and main regions
  var AppLayout = Marionette.LayoutView.extend({
    el: "#app",
    template: require("../templates/layout.html"),
    childEvents: {
      login: "login",
      loadAddMotionsScreen: "loadAddMotionsScreen",
      loadManageMotionsScreen: "loadManageMotionsScreen",
      loadVotingScreen: "loadVotingScreen",
      logout: "logout"
    },
    login: function() {
      loggedInUser.set("name", $("#username").val());
      this.showTopToolbarView();
      this.top.empty();
      this.main.empty();
    },
    logout: function() {
      this.header.empty();
      this.top.empty();
      this.main.show(new LoginForm());
    },
    showTopToolbarView: function() {
      this.header.show(new TopToolbarView());
    },
    regions: {
      header: "#header",
      top: "#top",
      main: "#main"
    }
  });

  // Initialisation
  app.on("start", function() {
    var appLayout = new AppLayout();
    appLayout.render();
    appLayout.main.show(new LoginForm());
  });
  app.start();
});