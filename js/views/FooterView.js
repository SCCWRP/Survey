var app = app || {};

app.FooterView = Backbone.View.extend({
	template:_.template($('#tpl-footer').html()),
	initialize: function(){
	},
	events: {
		"click #back": "back",
		"click #edit": "goToEdit",
		"click #forward": "forward",
		"click #restart": "restart",
		"click #restartCancel": "cancel",
		"click #restartRestart": "reload",
		"click #survey": "goToSurvey",
		"click #sync": "goToSync"
		},
   	back: function (e) { 
	 	e.preventDefault();
		this.trigger("back");
	},
    	forward: function (e) { 
	  	e.preventDefault();
		//this.toggle("off");
		this.trigger("forward");
	},
	restart: function () {
		function onConfirm(e){
			if(e == "yes"){
	        		Backbone.history.navigate('survey/start', {trigger: false});
	        		location.assign(HOME);
			}
			if(e == "no"){
				return;
			}
		}
		custom_confirm("Do you want to quit and restart?", "Restart", "Yes", "No", onConfirm);
	},
	goToEdit: function () {
		//alert("goToEdit");
		app.helpers.dialog("Survey is Complete","Notification","Ok");
		//app.Routes.navigate("survey/edit", {trigger: true});
	},
	goToSurvey: function () {
		function onConfirm(e){
			if(e == "yes"){
	        		Backbone.history.navigate('survey/start', {trigger: false});
	        		location.assign(HOME);
			}
			if(e == "no"){
				return;
			}
		}
		custom_confirm("Do you want to quit and restart?", "Restart", "Yes", "No", onConfirm);
	},
	goToSync: function () {
		alert("goToSync");
		app.helpers.submitData();
		//app.Routes.navigate("survey/sync", {trigger: true});
	},
	render: function(){
		$(this.el).html("");
		$(this.el).html(this.template());	
		$('#footer').trigger('create');
		//$('#footer').fixedtoolbar({ hideDuringFocus: "input, select" });
		return this;
	}
});
