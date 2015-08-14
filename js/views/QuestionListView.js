var app = app || {};

app.QuestionListView = Backbone.View.extend({
	el: '#header',
	template:_.template($('#tpl-question-details').html()),
	render: function(){
		$(this.el).html("");
		var rawTitle = this.model.get("title");
		if(isDevice){
			$(this.el).html('<b id="survey_id">ID:'+timestampFile+'</b><br><b id="latlonid">Lat/Lon:'+latlon+'</b>');	
		}
		$(this.el).append(this.template({"title": rawTitle}));	
	}
});
