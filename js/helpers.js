var app = app || {};
app.helpers = {
	css: function() {
	     /* usually triggering just page works but only content works for now - triggering both */
	     $('#content').trigger('create');
	     $('#one').trigger('pagecreate');
	     $('html,body').animate({ scrollTop: '0px'}, 0);
	     this.resizePage();
	     var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
	    if(deviceType == "iPhone"){
			$('.ui-title').css('font-size','18px');
			$('#multi-view .ui-btn-text').css('font-size','18px');
			$('#multi-view').css('margin-left','15%');
			$('#multi-select').css('margin-left','5%');
			$('#multi-select h3').css('font-size','18px');
			$('#multi-select select').css('font-size','18px');
			$('#multi-select-time').css('margin-left','-3%');
	    }
	},
  	dialog: function(message,title,button){
		if(isDevice == true){
			function alertDismiss(){
				//alert("alertDismiss");
			}
			navigator.notification.alert(
				message,
		        	alertDismiss,         // callback
				title,
				button
			);
		} else {
			alert(message);
		}
	},
  	getImage: function(callback,t,choice){
		alert("getImage");
	  	var imgUrl;
	  	function movePicture(picture){
			alert("getImage-movePicture");
			var currentDate = new Date();
			var currentTime = currentDate.getTime();
			var fileName = currentTime + ".jpg";
			var baseUrl = "http://data.sccwrp.org/survey/files/";
			var completeUrl = baseUrl + fileName;
			// get existing url and add to it if necessary - image library choices
			var existingUrl = t.get('picture_url');
			// is it set already
			var newUrl;
			if(existingUrl){
				newUrl = existingUrl + "," + completeUrl;
			} else {
				newUrl = completeUrl;
			}
			t.set({ picture_url: newUrl });
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
				fileSystem = fs;
				fileSystem.root.getDirectory('org.sccwrp.survey', {create: true},
				function(dirEntry) {
					alert("getImage-dirEntry");
					picture.moveTo(dirEntry, fileName, onSuccessMove, app.helpers.onError);
				}, app.helpers.onError);
			}, app.helpers.onError);
			callback(fileName);
	    	}
	    	function findPictureLocation(file){
			window.resolveLocalFileSystemURI(file, movePicture, app.helpers.onError);
	    	}
	    	function onSuccessMove(f){
			alert("onSuccessMove");
			savedPicture = true;
			function onConfirm(e){
				alert("onConfirm");
				if(e == "yes"){
					app.helpers.getImage(function(imgUrl){ }, t, "Camera");
				}
				if(e == "no"){
					$("#one").show();
				}
			}
			if(choice == "Camera"){
				custom_confirm("Would you like to add another picture?", "Additional Picture", "Yes", "No", onConfirm);
	  		}
	     	} 
    	     	function onSuccess(imageURI){
			var returnFile = findPictureLocation(imageURI);
	  	}
       	  	function onFail(message){
			callback("failed: "+ message);
	  	}
	  	// ios bug
 	  	if(choice == "Camera"){
			navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URI });
	  	} else {
			// use imagePicker plugin to select multiple images from users picture library
			window.imagePicker.getPictures(
			function(results){
				for(var i = 0; i < results.length; i++){
					onSuccess(results[i]);
				}
			}, function(error){
				alert('Error: '+error);
			});
			$("#one").show();
	  	}
	},
  	getGPSOnSuccess: function(position){
		latlon = position.coords.latitude + "," + position.coords.longitude
  	},
  	getGPSOnFailure: function(error){
		latlon = "failed";
  	},
  	onDeviceReady: function(){
		if(isDevice){
			latlon = navigator.geolocation.getCurrentPosition(app.helpers.getGPSOnSuccess, app.helpers.getGPSOnFailure);
			alert(latlon);
		}
		//window.requestFileSystem(window.TEMPORARY, 5*1024*1024 /*5MB*/, app.onFSSuccess, app.onError); // using chrome if mobile see below
  	},
	onError: function(e){
	alert("onError");
	var msg = '';
    	switch (e.code) {
          case FileError.QUOTA_EXCEEDED_ERR:
		msg = 'QUOTA_EXCEEDED_ERR';
          break;
          case FileError.NOT_FOUND_ERR:
		msg = 'NOT_FOUND_ERR';
	  break;
	  case FileError.SECURITY_ERR:
	      msg = 'SECURITY_ERR';
	  break;
	  case FileError.INVALID_MODIFICATION_ERR:
	      msg = 'INVALID_MODIFICATION_ERR';
	  break;
	  case FileError.INVALID_STATE_ERR:
	      msg = 'INVALID_STATE_ERR';
	  break;
	  default:
	      msg = 'Unknown Error';
	  break;
	};
      	alert('Error: ' + msg);
  	},
  	resizePage: function(){
	/* in the beta version this functin was used with unique form element names
	   in full study all (maybe) form elements derive from .ui-field-contain */
/* this isnt perfect but seems to work - going to need more work to get exact */ 
	// total size of form element and amount of space from top
	var formSize = Math.round($('#content').offset().top+$('#content').height());
	//var formSize = Math.round($('.ui-field-contain').offset().top+$('.ui-field-contain').height());
	//console.log("formSize: "+ formSize);
	// size of page minus footer - changed from one to content for full study
	var stageSize = Math.round($('#one').height()-$('#footer').height());
	//console.log("stageSize: "+ stageSize);
	// total size of form element with some padding
	var minHeight = "" + (formSize + 400) + "px";
	//console.log("minHeight: "+ minHeight);
	// get consent if set
	//var consentSize = Math.round($('#consent').height());
	//console.log("consentSize: "+consentSize);
	// current size of entire page
	var oneHeight = (formSize > stageSize) ? minHeight:("" + Math.round($('#one').height()) + "px");
	//console.log("multi-select: "+ $('#multi-select').height());
	if($('#consent').height() == 0){
		$('#one').css('height',6100);
	} else {
		if(($('#consent').height() > 0) && (screen.width <= 1024)){
			$('#one').css('height',6500);
		} else {
			$('#one').css('height',oneHeight);
		}
	}
	if($('#multi-select').height()){
		var multiHeight = ($('#multi-select').height()+500+"px");
		$('#one').css('height',multiHeight);
	}
	if($('#multi-view').height()){
		var multiHeight = ($('#multi-view').height()+500+"px");
		$('#one').css('height',multiHeight);
	}
  }
};
