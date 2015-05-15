var app = app || {};

app.Router = Backbone.Router.extend({
	routes: {
		"survey/start":"home",
		"" : "home"
		},
	home: function () {
		this.clearView();
		var gotQuestion;
		app.questionList = new app.QuestionList();
        	app.questionList.fetch({ success: function(response){ 
			console.log(response);
			/*console.log("questionList fetch - success");*/ 
			app.questionList.getQuestion();
			gotQuestion = app.questionList.get("1");
		//gotQuestion = app.questionList.get("1");
		//var gotQuestion = app.questionList.get(nextQcount);
		app.questionListView = new app.QuestionListView({model: gotQuestion});
		app.questionListView.render();
		}});
		app.currentView = new app.HomeView();
		$("#content").html( app.currentView.render().el );
		app.currentFooter = new app.FooterView();
		$("#footer").html( app.currentFooter.render().el );
		app.helpers.css();
	},
	clearView: function () {
		if(!app.currentView)return;
	}
})
