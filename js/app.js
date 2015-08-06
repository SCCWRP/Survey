var app = app || {};

$.support.cors = true;
$.mobile.ajaxEnabled = false;
$.mobile.linkBindingEnabled = false;
$.mobile.hashListeningEnabled = false;
$.mobile.pushStateEnabled = false;
networkStatus = navigator.onLine ? 'online' : 'offline';
Backbone.history.start({pushState: true, hashChange: false});
//FastClick.attach(document.body);
if(document.URL.indexOf("http://") === -1 && document.URL.indexOf("https://") === -1){
	isDevice = true;
}
if( isDevice ){
	document.addEventListener("deviceready", function(){
		alert("deviceready");
		app.helpers.onDeviceReady();
	},true);
} else {
	app.helpers.onDeviceReady();
}
app.currentView = null;
app.Routes = new app.Router();
app.Routes.home();
