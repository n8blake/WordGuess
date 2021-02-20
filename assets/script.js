const wordElement = document.querySelector(".word-container");

const wordURL = "https://random-word-api.herokuapp.com/word?number=1";
const fetchWord = fetch(wordURL);

const processFetchWord = function(word){
	return word.then(response => response.json())
	.then(data => {
		let word = data[0];
		console.log(word.length);
		for(var i = 0; i < word.length; i++){
			let letterElement = document.createElement("span");
			letterElement.innerHTML = word.charAt(i);
			letterElement.style.margin = "10";
			wordElement.appendChild(letterElement);
		}
		wordElement.innerHTML = word;
		fetchDefinition(word);
	});
}

const fetchDefinition = function(word){
	//word = "bathyal";
	let definitionURL = "https://owlbot.info/api/v4/dictionary/" + word;
	return fetch(definitionURL, {
	method: 'GET', 
	headers: {
		'Authorization': 'Token 8cf2d442d2de9a57913b4bee0c72692545b046df',
	}
}).then(response => {
	console.log(response.status);
	/* if(response.status === 404){
		return fetchWord.then(processFetchWord(fetchWord));
	} */
	return response.json();
})
  .then(data => console.log(data));
} 

fetchWord.then(processFetchWord(fetchWord));