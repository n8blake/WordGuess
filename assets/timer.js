let timeLeft = 60 * 1000;

const timeDiv = document.querySelector("#time-div");
const startBtn = document.querySelector("#start-button");
var timerInterval;

function startGame(){
	if(word.length == 0) return;
	gameRunning = true;
	let main = document.querySelector("main");
	main.classList.remove("game-stopped");
	main.classList.add("game-running");
	startBtn.style.display = "none";
	timeDiv.style.display = "block";
	timerInterval = setInterval(countDown, 100);
}

function endGame(){
	clearInterval(timerInterval);
	// show all the letters if they haven't been guessed
	gameRunning = false;
	// show the definition of the word and usage

}

function countDown(){
	timeDiv.innerHTML = timeLeft / 100;
	if(timeLeft <= 0){
		endGame();
	}
	if(won(word, guessedLetters)){
		endGame();
		document.querySelector("#start-button").style.display = "block";
		timeDiv.innerHTML = "YOU WON!";
	}
	timeLeft -= 100;
}