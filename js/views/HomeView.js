var app = app || {};

app.HomeView = Backbone.View.extend({
	//el: "#app",
	template:_.template($('#tpl-home').html()),
	initialize: function () {
		//alert("initialize AppView");
	},
	events: {
		"click #survey": "goToSurvey",
		"click #edit": "goToEdit",
		"click #sync": "goToSync"
		},
	goToEdit: function () {
		app.Routes.navigate("survey/edit", {trigger: true});
	},
	goToSurvey: function () {
		app.Routes.navigate("survey/survey", {trigger: true});
	},
	goToSync: function () {
		app.Routes.navigate("survey/sync", {trigger: true});
	},
	render: function () {
		$(this.el).html(this.template());
		return this;
	}
});
