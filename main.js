let contentContainer = document.querySelector('#content');

const query1 = [{title: 'Walking', name: '1', tooltip: 'Within walking distance'},
	{title: 'Driving', name: '1', tooltip: 'Within driving distance'},
	{title: 'Either', name: '1', tooltip: ''}];

const query2 = [{title: 'Food', name: '2', tooltip: ''},
	{title: 'Coffee', name: '2', tooltip: ''},
	{title: 'Dessert', name: '2', tooltip: ''},
	{title: 'Anything', name: '2', tooltip: ''}];

const query3 = [{title: 'Now', name: '3', tooltip: ''},
	{title: 'Morning', name: '3', tooltip: ''},
	{title: 'Afternoon', name: '3', tooltip: ''},
	{title: 'Evening', name: '3', tooltip: ''},
	{title: 'Late Night', name: '3', tooltip: ''}];

const query4 = [{title: 'Yeah sure', name: '4', tooltip: ''},
	{title: 'No thanks', name: '4', tooltip: ''}];

const query5 = [{title: 'Not much', name: '5', tooltip: ''},
	{title: 'Some', name: '5', tooltip: ''},
	{title: 'A lot', name: '5', tooltip: ''}];

const dictionary = {
	'Walking': 'radius=1500',
	'Driving': 'radius=5000',
	'Food': 'term=food',
	'Coffee': 'term=coffee',
	'Dessert': 'term=dessert',
	'Now': 'open_now=true',
	'Morning': 'open_at=480',
	'Afternoon': 'open_at=780',
	'Evening': 'open_at=1020',
	'Late Night': 'open_at=1380',
	'Not much': 'price=1,2',
	'Some': 'open_at=1,2,3',
	'A lot': 'open_at=1,2,3,4'
}


addQuery('Walking or Driving?', query1);
addQuery('What are you looking for?', query2);
addQuery('Around when are you leaving?', query3);
addQuery('Include chain resturants?', query4);
addQuery('How much do you want to spend?', query5);

function addQuery(string, arr){
	let form = document.createElement('form');
	let optionContainer = document.createElement('div');
	let text = document.createTextNode(string);

	form.className = 'query';
	optionContainer.className = 'buttonContainer';

	form.appendChild(text);
	form.appendChild(optionContainer);

	arr.forEach(choice => {
		let info = choice;
		let label = document.createElement('label');
		let input = document.createElement('input')
		let box = document.createElement('div');
		let span = document.createElement('span');
		let buttonText = document.createTextNode(info.title)

		input.setAttribute("type", "radio");
		input.setAttribute("name", info.name)
		span.appendChild(buttonText);
		box.className = 'box';

		box.appendChild(span);
		label.appendChild(input);
		label.appendChild(box);

		box.addEventListener('click', () => {
			if(input.checked) {
				input.checked = false;
			}
		});

		optionContainer.appendChild(label);
	});
	contentContainer.appendChild(form);
}

(function addSearch(){
	let searchButton = document.createElement('button');
	searchButton.className = 'search'
	searchButton.innerHTML = 'Search';

	contentContainer.appendChild(searchButton);

	searchButton.addEventListener('click', getSearchTerms);
})();

function getSearchTerms(){
	let terms = '';
	let selected = document.querySelectorAll('input:checked');

	selected.forEach(node => {
		let value = node.parentNode.outerText;
		if(dictionary[value]){
			terms = terms + dictionary[value] + '&';
		}
	});


	console.log(terms.slice(0, -1));
	sendRequest();

	return terms.slice(0, -1)
}

function init() {
    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(40.6700, -73.9400),
        styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#e6f3d6"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f4d2c5"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#f4f4f4"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#eaf6f8"}]}],
		disableDefaultUI: true
    };

    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.6700, -73.9400),
        map: map,
        title: 'Snazzy!'
    });
}

function sendRequest(){
	const yelp = require('yelp-fusion');
	const apiKey = 'VBT7I9nnw7VYOc5_imEf0Kb4tr6zRy0P2agdOwncem5fctkMdiBkbAuqvq4zCDLZ3PWVIg0iwUXx982v7GjWAifABSYsaeL6C7vbu9g8zLaiNCZj4vnvUHF1v_2KWnYx';
	const searchRequest = {
	  term:'Four Barrel Coffee',
	  location: 'san francisco, ca'
	};

	const client = yelp.client(apiKey);

	client.search(searchRequest).then(response => {
	  const firstResult = response.jsonBody.businesses[0];
	  const prettyJson = JSON.stringify(firstResult, null, 4);
	  console.log(prettyJson);
	}).catch(e => {
	  console.log(e);
	});
}
