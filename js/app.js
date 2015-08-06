var app = app || {};

$.support.cors = true;
$.mobile.ajaxEnabled = false;
$.mobile.linkBindingEnabled = false;
$.mobile.hashListeningEnabled = false;
$.mobile.pushStateEnabled = false;
networkStatus = navigator.onLine ? 'online' : 'offline';
Backbone.history.start({pushState: true, hashChange: false});
//FastClick.attach(document.body);
if( isDevice ){
	document.addEventListener("deviceready", function(){
		app.helpers.onDeviceReady();
	},true);
} else {
	app.helpers.onDeviceReady();
}
app.currentView = null;
app.Routes = new app.Router();
app.Routes.home();
