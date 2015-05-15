var app = app || {};

app.QuestionListView = Backbone.View.extend({
	el: '#header',
	template:_.template($('#tpl-question-details').html()),
	render: function(){
		$(this.el).html("");
		var rawTitle = this.model.get("title");
		$(this.el).html(this.template({"title": rawTitle}));	
	}
});
