let timeLeft = 30 * 1000;

const timeDiv = document.querySelector("#time-div");
const startBtn = document.querySelector("#start-button");
var timerInterval;

function startGame(){
	if(word.length == 0) return;
	gameRunning = true;
	let main = document.querySelector("main");
	const instructionsElement = document.querySelector("#instructions");
	instructionsElement.classList.add("vanish-up");
	instructionsElement.addEventListener('animationend', () => {
		instructionsElement.classList.add("collapsed");
	});
	main.classList.remove("game-stopped");
	main.classList.add("game-running");
	startBtn.style.display = "none";
	timeDiv.style.display = "block";
	timerInterval = setInterval(countDown, 100);
}

function endGame(){
	clearInterval(timerInterval);
	gameRunning = false;
	timeDiv.innerHTML = "TIME'S UP!";
	timeDiv.style.color = "#c62d1f";
	for(var i = 0; i < word.length; i++){
		let letter = word.charAt(i);
		//console.log(letter);
		letterElement = document.querySelector("#letter-" + i);
		//console.log(letterElement);
		letterElement.classList.remove("unguessed");
		letterElement.innerHTML = letter;
		if(!guessedLetters.includes(letter)){
			document.querySelector("#word-message").innerHTML = "The word was";
			letterElement.style.color = "#c62d1f";
		}
	}
	// show all the letters if they haven't been guessed
	// show the definition of the word and usage
	document.querySelector("#definitions-div").style.display = "block";
	document.querySelector("#guesses-div").style.display = "none";
}

function countDown(){
	timeDiv.innerHTML = timeLeft / 100;
	if(timeLeft <= 0){
		endGame();
	}
	if(won(word, guessedLetters)){
		endGame();
		//document.querySelector("#start-button").style.display = "block";
		timeDiv.innerHTML = "YOU WON!";
	}
	timeLeft -= 100;
}