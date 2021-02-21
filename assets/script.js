const wordElement = document.querySelector(".word-container");
const wordURL = "https://random-word-api.herokuapp.com/word?number=1";
var fetchWord = fetch(wordURL);

var word = "";
var definitions = [];

// process the fetched word
const processFetchWord = function(_word){
	return _word.then(response => response.json())
	.then(data => {
		_word = data[0];
		window.word = _word;
		console.log(window.word);
		for(var i = 0; i < _word.length; i++){
			let letterElement = document.createElement("span");
			//letterElement.innerHTML = word.charAt(i);
			letterElement.setAttribute("id", "letter-" + i);
			letterElement.classList.add("letter");
			letterElement.classList.add("unguessed");
			wordElement.appendChild(letterElement);
		}
		fetchDefinition(_word).then((value) => {
			//console.log(value);
			if(value === 404){
				fetchWord = fetch(wordURL);
				fetchWord.then(processFetchWord(fetchWord));
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
  	definitions = data;
  	return data;
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
						timeLeft += 1000;
					}
					if(won(word, guessedLetters)){
						clearInterval(timerInterval);
						document.querySelector("#start-button").style.display = "block";
						timeDiv.innerHTML = "YOU WON!";
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
	return true;
}

function isLetter(string) {
	return string.length === 1 && string.match(/[a-z]/i);
}

document.addEventListener("keydown", guessLetter);