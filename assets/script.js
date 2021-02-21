const wordElement = document.querySelector(".word-container");
const wordURL = "https://random-word-api.herokuapp.com/word?number=1";
const fetchWord = fetch(wordURL);

var word = "";
var definitions = [];

function startGame(){
	let main = document.querySelector("main");
	main.classList.remove("game-stopped");
	main.classList.add("game-running");
	document.querySelector("#start-button").style.display = "none";
	document.querySelector("#time-div").style.display = "block";
}



// process the fetched word
const processFetchWord = function(word){
	return word.then(response => response.json())
	.then(data => {
		word = data[0];
		window.word = word;
		console.log(word);
		for(var i = 0; i < word.length; i++){
			let letterElement = document.createElement("span");
			//letterElement.innerHTML = word.charAt(i);
			letterElement.setAttribute("id", "letter-" + i);
			letterElement.classList.add("letter");
			letterElement.classList.add("unguessed");
			wordElement.appendChild(letterElement);
		}
		fetchDefinition(word);
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
	/* if(response.status === 404){
		return fetchWord.then(processFetchWord(fetchWord));
	} */
	return response.json();
})
  .then(data => {
  	console.log(data);
  	definitions = data;
  });
} 

fetchWord.then(processFetchWord(fetchWord));

var guessedLetters = [];
const guessedLettersElement = document.querySelector(".guessed-letters");

function guessLetter(event){
	if(word.length > 0){
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

function isLetter(string) {
	return string.length === 1 && string.match(/[a-z]/i);
}

document.addEventListener("keydown", guessLetter);