(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../templates/layout.html":2,"../templates/login-form.html":3,"../templates/toolbar-top.html":4}],2:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id = "header"></div>\n<div id = "top"></div>\n<div id = "main"></div>\n';
}
return __p;
};

},{}],3:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class = \'form-row\'>\n  <p><label for = "username">Username</label></p>\n  <p><input type = "text" placeholder = "address@email.com" id = "username" /></p>\n</div>\n<div class = \'form-row\'>\n  <p><label for = "password">Password</label></p>\n  <p><input type = "password" placeholder = "password" id ="password" /></p>\n</div>\n<div class = \'form-row\'>\n  <p><button id = \'login\'>Login</button></p>\n</p>\n';
}
return __p;
};

},{}],4:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<button class = "toolbarButton" id="addMotionsButton">Eat</button>\n<button class = "toolbarButton" id="manageMotionsButton">Play</button>\n<button class = "toolbarButton" id="voteButton">Emote</button>\n<button class= "toolbarButton" id="logoutButton">Logout</button>\n<img id="avatar" src="https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/1507754_10152527582586813_4848509230288745431_n.jpg?oh=2e5b4e53ea77d05ec5723eb6a829c40d&oe=564E82DA" height="30" width="30"></img>\n<div id="loginStatus"><div id="loggedInText">Logged in user:</div><span id="name">'+
((__t=( name ))==null?'':__t)+
'</span></div>\n';
}
return __p;
};

},{}]},{},[1]);
