var app = app || {};

app.currentView = null;
app.Routes = new app.Router();
Backbone.history.start({pushState: true});
app.Routes.home();
