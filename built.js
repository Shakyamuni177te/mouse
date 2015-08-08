(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global Backbone, Marionette, $, require */

$(function() {

  "use strict";

  var app = new Marionette.Application();

  var loggedInUser = new Backbone.Model();

  // Collection of proposals
  var proposals = new Backbone.Collection();

  // View for the Add Proposal form
  var ProposalForm = Marionette.ItemView.extend({
    template: require("../templates/page1.html"),
    events: {
      "click button": "addProposal"
    },
   
    addProposal: function() {
      var text = this.$("textarea").val();
      if (text !== "") {
        proposals.add({
          name: text
        });
      }
      this.$("textarea").val("");
    }
  });


  // View for a single proposal (a row in the proposals table)
  var ProposalView = Marionette.ItemView.extend({
    tagName: "tr",
    template: require("../templates/page1.html"),
    events: {
      "click button": "delete"
    },
    delete: function() {
      proposals.remove(this.model);
    }
  });

  // View for the list of proposals
  var ProposalList = Marionette.CompositeView.extend({
    tagName: "div",
    template: require("../templates/page1.html"),
    childView: ProposalView,
    childViewContainer: ".childViewContainer"
  });

  // View for a single votable proposals (a row in the proposals table)
  var VotingView = Marionette.ItemView.extend({
    tagName: "tr",
    template: require("../templates/page1.html"),
    events: {
      "click #voteYesButton": "voteYes",
      "click #voteNoButton": "voteNo",
      "click #voteAbstainButton": "voteAbstain",
    },
    voteYes: function() {
      alert("voted Yes!");
    },
    voteNo: function() {
      alert("voted No!");
    },
    voteAbstain: function() {
      alert("Abstained!");
    }
  });
    // Inventory list
    var InventoryView = Marionette.ItemView.extend({
    tagName: "div",
    template: require("../templates/page1.html"),
    childView: VotingView,
    childViewContainer: ".childViewContainer"
  });
   // View for the list of spells
  var SpellView = Marionette.ItemView.extend({
    tagName: "div",
    template: require("../templates/page1.html"),
    childView: VotingView,
    childViewContainer: ".childViewContainer"
  });

 // View for emotional states
  var EmotionsView = Marionette.ItemView.extend({
    tagName: "div",
    template: require("../templates/page1.html"),
    childView: VotingView,
    childViewContainer: ".childViewContainer"
  });


 // View for emotional states
  var CharactersView = Marionette.ItemView.extend({
    tagName: "div",
    template: require("../templates/page1.html"),
    childView: VotingView,
    childViewContainer: ".childViewContainer"
  });

 // View for emotional states
  var BattleView = Marionette.ItemView.extend({
    tagName: "div",
    template: require("../templates/page1.html"),
    childView: VotingView,
    childViewContainer: ".childViewContainer"
  });
 

  // View for login info (tracks logged in user)
  var TopToolbarView = Marionette.ItemView.extend({
    tagName: "div",
    id: "topToolbar",
    model: loggedInUser,
    template: require("../templates/toolbar-top.html"),
    events: {
        "click #invButton": function() {
        this.triggerMethod("inventory");
      },
      "click #spellsButton": function() {
        this.triggerMethod("spells");
      },
      "click #emotionsButton": function() {
        this.triggerMethod("emotions");
      },
      "click #charactersButton": function() {
        this.triggerMethod("characters");
      },
      "click #battleButton": function() {
        this.triggerMethod("battle");
      },
      "click #logoutButton": function() {
        this.triggerMethod("logout");
      }
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
      inventory: "inventory",
      spells: "spells",
      emotions: "emotions",
      characters: "characters",
      battle: "battle",
      loadManageMotionsScreen: "loadManageMotionsScreen",
      loadVotingScreen: "loadVotingScreen",
      logout: "logout"
    },
    login: function() {
      loggedInUser.set("name", $("#username").val());
      this.inventory();
    },
     inventory: function() {
       $("#invButton").click(function() {
       $(this).effect("fade");
      });
      this.top.empty();
      this.showTopToolbarView();
      this.main.empty();
      this.main.show(new InventoryView());
     },
       spells: function() {
       $("#spellsButton").click(function() {
       $(this).effect("fade");
      });
      this.top.empty();
      this.showTopToolbarView();
      this.main.empty();
      this.main.show(new SpellView());
     },
       emotions: function() {
       $("#emotionsButton").click(function() {
       $(this).effect("fade");
      });
      this.top.empty();
      this.showTopToolbarView();
      this.main.empty();
      this.main.show(new EmotionsView());
     },
       battle: function() {
       $("#battleButton").click(function() {
       $(this).effect("fade");
      });
      this.top.empty();
      this.showTopToolbarView();
      this.main.empty();
      this.main.show(new CharactersView());
     },
       characters: function() {
       $("#charactersButton").click(function() {
       $(this).effect("fade");
      });
      this.top.empty();
      this.showTopToolbarView();
      this.main.empty();
      this.main.show(new BattleView());
     },
    loadManageMotionsScreen: function() {
      this.showTopToolbarView();
      this.top.empty();
      this.main.show(new ProposalList({collection: proposals}));
    },
    loadAddMotionsScreen: function() {
      this.showTopToolbarView();
      this.top.empty();
      this.main.show(new ProposalList({collection: proposals}));
    },
    loadVotingScreen: function() {
      this.showTopToolbarView();
      this.top.empty();
      this.main.show(new VotingList({collection: proposals}));
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

},{"../templates/layout.html":2,"../templates/login-form.html":3,"../templates/page1.html":4,"../templates/toolbar-top.html":5}],2:[function(require,module,exports){
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
__p+='<div id="main-content">\n\t\t\t<p><i>"If naked is the most honest you can be and society teaches you it\'s dirty and corrupt and a sin then no wonder this is the world we live in" -- Leon De Sade</i></p>\n\n\t\t\t<div id=firstText><p>You are Rabbit-Cat. A white-furred rabbit-like creature who stands a few inches shorter than the average human. You have a cat tail and bright, feline eyes.</div>\n<button id="stepForwardButton">Step Forward</button><button id="hideButton">Hide</button>\n</p>\n\t\t\t</div>\n';
}
return __p;
};

},{}],5:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<button class = "toolbarButton" id="invButton">Inventory</button>\n<button class = "toolbarButton" id="spellsButton">Spells</button>\n<button class = "toolbarButton" id="emotionsButton">Emotions</button>\n<button class = "toolbarButton" id="charactersButton">Characters</button>\n<button class = "toolbarButton" id="battleButton">Battle</button>\n<button class= "toolbarButton" id="logoutButton">Logout</button>\n<img id="avatar" src="https://scontent-lhr3-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/1507754_10152527582586813_4848509230288745431_n.jpg?oh=2e5b4e53ea77d05ec5723eb6a829c40d&oe=564E82DA" height="30" width="30"></img>\n<div id="loginStatus"><div id="loggedInText">Logged in user:</div><span id="name">'+
((__t=( name ))==null?'':__t)+
'</span></div>\n';
}
return __p;
};

},{}]},{},[1]);
