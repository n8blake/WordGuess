// process the fetched word
const processFetchWord = function(_word){
	return _word.then(response => response.json())
	.then(data => {
		_word = data[0];
		try {
		fetchDefinition(_word).then((value) => {
			//console.log(value);
			if(value === 404){
				fetchWord = fetch(wordURL);
				fetchWord.then(processFetchWord(fetchWord));
			} else {
				window.word = _word;
				//console.log(dictionaryEntry);
				startBtn.style.display = "block";
				addDictionaryEntryToPage()
				for(var i = 0; i < _word.length; i++){
					let letterElement = document.createElement("span");
					letterElement.setAttribute("id", "letter-" + i);
					letterElement.classList.add("letter");
					letterElement.classList.add("unguessed");
					wordElement.appendChild(letterElement);
				}
			}
		});
	} catch(err){
		console.log(err);
	}
	
	});
}

// get definition for the word
const fetchDefinition = function(word){
	let definitionURL = "https://owlbot.info/api/v4/dictionary/" + word;
	return fetch(definitionURL, {
		method: 'GET', 
		headers: {
			'Authorization': 'Token 8cf2d442d2de9a57913b4bee0c72692545b046df',
		}
	}).then(response => {
		//console.log(response);
		if(response.status === 404){
			return response.status;
		} else {
			return response.json();
		}
	})
	.then(data => {
		dictionaryEntry = data;
		return data;
	});
} 

// Create the html elements for the dictionary entry and 
// add it to the page.
function addDictionaryEntryToPage(){
	const definitionsDiv = document.querySelector("#definitions-div");
	definitionsDiv.innerHTML = "";
	if(dictionaryEntry.pronunciation){
		const pronunciationTitle = document.createElement("h3");
		pronunciationTitle.innerHTML = "Pronunciation";
		definitionsDiv.appendChild(pronunciationTitle);
		const pronunciation = document.createElement("p");
		pronunciation.innerHTML = dictionaryEntry.pronunciation;
		definitionsDiv.appendChild(pronunciation);
	}
	if(dictionaryEntry.definitions.length > 0){
		const definitionsTitle = document.createElement("h3");
		(dictionaryEntry.definitions.length > 1) ? definitionsTitle.innerHTML = "Definitions" : definitionsTitle.innerHTML = "Definition";
		definitionsDiv.appendChild(definitionsTitle);
		const ul = document.createElement("ul");
		for(var i = 0; i < dictionaryEntry.definitions.length; i++){
			const li = document.createElement("li");
			const h4 = document.createElement("h4");
			h4.innerHTML = dictionaryEntry.definitions[i].type;
			li.appendChild(h4);
			const pDefinition = document.createElement("p");
			pDefinition.classList.add("definition");
			pDefinition.innerHTML = dictionaryEntry.definitions[i].definition;
			li.appendChild(pDefinition);
			if(dictionaryEntry.definitions[i].example){
				const pExample = document.createElement("p");
				pExample.classList.add("example");
				pExample.innerHTML = dictionaryEntry.definitions[i].example;
				li.appendChild(pExample);
			}
			ul.appendChild(li);
		}
		definitionsDiv.appendChild(ul);
	}
}
