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
			app.questionListView = new app.QuestionListView({model: gotQuestion});
			app.questionListView.render();

	        	app.answerList = new AnswerList();
		var answerCreate = app.answerList.create({qcount: 1, device_type: deviceType, coordinates: latlon, timestamp: SESSIONID}, {
                	success: function(response){
				console.log(response);
		        	var answer = app.answerList.get(response.id);
				app.answerListView = new AnswerListView({model: answer });
				app.answerListView.endquestion = MAXQUESTION;
                	}, error: function(model, response){
				console.log(response.responseText);
				console.log(response.status);
				console.log(response.statusText);
			}
		});
		}});
		//app.currentView = new app.HomeView();
		//$("#content").html( app.currentView.render().el );
		app.currentFooter = new app.FooterView();
		$("#footer").html( app.currentFooter.render().el );
		app.helpers.css();
	},
	clearView: function () {
		if(!app.currentView)return;
	}
})
