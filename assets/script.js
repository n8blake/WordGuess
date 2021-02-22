const wordElement = document.querySelector(".word-container");
const wordURL = "https://random-word-api.herokuapp.com/word?number=1";
var fetchWord = fetch(wordURL);

var word = "";
var dictionaryEntry = {};
var gameRunning = false;

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


fetchWord.then(processFetchWord(fetchWord));

var guessedLetters = [];
const guessedLettersElement = document.querySelector(".guessed-letters");

function guessLetter(event){
	if(word.length > 0 && gameRunning){
		if(isLetter(event.key)){
			const letter = event.key.toLowerCase();
			console.log(letter);
			if(!guessedLetters.includes(letter)){
				guessedLetters.push(letter);
				for(var i = 0; i < word.length; i++){
					if(word.charAt(i).toLowerCase() === letter){
						letterElement = document.querySelector("#letter-" + i);
						letterElement.classList.remove("unguessed");
						letterElement.innerHTML = word.charAt(i);
						timeLeft += 1000;
					}
				}
				let guessedLetterElement = document.createElement("span");
				guessedLetterElement.setAttribute("id", "guess-" + letter);
				guessedLetterElement.classList.add("letter");
				guessedLetterElement.innerHTML = letter;
				guessedLettersElement.appendChild(guessedLetterElement);
			}
		}
	} else {
		console.log("not ready");
	}
}

// won
// when all the letters from the word have been guessed
function won(word, letters){
	for(var i = 0; i < word.length; i++){
		if(!letters.includes(word.charAt(i))) return false;
	}
	return word.length > 0;
}

function isLetter(string) {
	return string.length === 1 && string.match(/[a-z]/i);
}

document.addEventListener("keydown", guessLetter);