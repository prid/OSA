//get data (categories and locations from spreadsheet)
(function (){
	var url="https://script.google.com/macros/s/AKfycbzk9jLbeFt8GjLsLsjRaQXda38CIg0aFWyyqiRkjwIcMz3V3ns/exec";
	var xhr=new XMLHttpRequest();
	xhr.open("GET",url+"?method=getLocations",true);
	xhr.onload=function(){
		data.locations=JSON.parse(this.response);
		$('#eventLocation').selectize({
			create: true,
			delimiter: null,
			valueField: 'value',
			labelField: 'display',
			searchField: 'display',
			options: data.locations.map(function(item){return {display:item,value:item}})
		});
		
	}
	xhr.send();
	
	var xhr=new XMLHttpRequest();
	xhr.open("GET",url+"?method=getCategories",true);
	xhr.onload=function(){
		data.categories=JSON.parse(this.response);
		$('#eventCategories').selectize({
			create: true,
			maxItems: null,
			valueField: 'value',
			labelField: 'display',
			searchField: 'display',
			options: data.categories.map(function(item){return {display:item,value:item}})
		});
		
	}
	xhr.send();
	
})()
