var CLIENT_ID = '947401214744-88drlih2lbg9910k5076krh28ap5eocs.apps.googleusercontent.com';

      var SCOPES = ["https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/drive"];

      /**
       * Check if current user has authorized this application.
       */
      function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var consoleDiv = document.getElementById('console-div');
		var authorizeButton = document.getElementById('authorize-btn');
		var inputDiv = document.getElementById('input-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeButton.style.display = 'none';
		  inputDiv.style.display = "initial";
          loadApis();  	  
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
		  inputDiv.style.display = "none";
        }
      }
	  
	  function loadApis(){
		  gapi.client.load('calendar', 'v3');
		  gapi.client.load('drive', 'v2');
	  }
	  
	  function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }
	  
	  function handleSubmitClick(event){
		  var data=collectInputDatas();
		  var event = {
		  'summary': data.title,
		  'location': data.location,
		  'description': JSON.stringify(data.json),
		  'start': {
			'dateTime': data.date+'T'+data.time,
			'timeZone': 'America/New_York'
		  },
		  'end': {
			'dateTime': data.date+'T'+data.time,
			'timeZone': 'America/New_York'
		  }
		};

	var request = gapi.client.calendar.events.insert({
		'calendarId': '04vk2bmpkinvlmhc23964pcllg@group.calendar.google.com',
		'resource': event
		});

	request.execute(function(event) {
		appendPre('Event created: ' + event.htmlLink);
		});
	  }
	function appendPre(message) {
        var pre = document.getElementById('console-div');
        var textContent = document.createTextNode(new Date()+": "+message + '\r\n');
        pre.appendChild(textContent);
		pre.appendChild(document.createElement("br"));
      }
	  
	  function collectInputDatas(){
		  
		  function getSelectValues(select) { var result = []; var options = select && select.options; var opt; for (var i=0, iLen=options.length; i<iLen; i++) { opt = options[i]; if (opt.selected) { result.push(opt.value || opt.text); } } return result; }
		  var title=eventTitle.value;
		  var date=eventDate.value;
		  var time=eventTime.value;
		  var location=eventLocation.options[0].value;
		  var categories=getSelectValues(eventCategories);
		  var description=eventDescription.value;
		  
		  var json={};
		  json.description=description;
		  json.categories=categories;
		  
		  var output={};
		  output.title=title;
		  output.date=date;
		  output.time=time+':00';
		  output.location=location;
		  try{
			  var imageObj=JSON.parse(document.querySelector('#imageUploadContainer').getAttribute('data'));
              var temp={};
			  temp.id=imageObj.id;
			  temp.title=imageObj.title;
              json.image=temp;
		  }catch(e){}
		  output.json=json;
		  
		  return output;
		  
	  }