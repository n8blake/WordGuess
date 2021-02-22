// process the fetched word
const processFetchWord = function(_word){
	return _word.then(response => response.json())
	.then(data => {
		_word = data[0];
		//_word = "bushwhacker";
		//console.log(window.word);
		fetchDefinition(_word).then((value) => {
			//console.log(value);
			if(value === 404){
				fetchWord = fetch(wordURL);
				fetchWord.then(processFetchWord(fetchWord));
			} else {
				window.word = _word;
				console.log(dictionaryEntry);
				//startBtn.style.display = "block";
				addDictionaryEntryToPage()
				for(var i = 0; i < _word.length; i++){
					let letterElement = document.createElement("span");
					//letterElement.innerHTML = word.charAt(i);
					letterElement.setAttribute("id", "letter-" + i);
					letterElement.classList.add("letter");
					letterElement.classList.add("unguessed");
					wordElement.appendChild(letterElement);
				}
			}
		});
	});
}

// get definition for the word
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
	if(response.status === 404){
		return response.status;
		//resolve('Fail!');
	} else {
		return response.json();
	}
})
  .then(data => {
  	//console.log(data);
  	dictionaryEntry = data;
  	return data;
  });
} 