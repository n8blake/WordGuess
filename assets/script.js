const wordElement = document.querySelector(".word-container");
const wordURL = "https://random-word-api.herokuapp.com/word?number=1";
var fetchWord = fetch(wordURL);

var word = "";
var dictionaryEntry = {};
var gameRunning = false;

//fetchWord.then(processFetchWord(fetchWord));

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
				guessedLetterElement.classList.add("guessed");
				guessedLetterElement.innerHTML = letter;
				guessedLettersElement.appendChild(guessedLetterElement);
			}
		}
	} else {
		console.log("not ready");
	}
}

function highlightLetter(event){
	if(isLetter(event.key)){
		const letter = event.key.toLowerCase();
		//document.querySelector("#letter-" + key);
		const letterElement = document.querySelector("#guess-" + letter);
		try {
			letterElement.classList.remove("already");
			// trigger reflow to hack css into restarting animation
			void letterElement.offsetWidth;
			letterElement.classList.add("already");
		} catch(error){
			//console.log(error);
		}
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
document.addEventListener("keydown", highlightLetter);
