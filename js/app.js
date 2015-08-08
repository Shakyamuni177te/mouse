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
