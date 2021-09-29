var timeEl = document.querySelector("#timer");
var scoreEl = document.querySelector("#score")
var gameStart = document.querySelector("#start");
var problem = document.querySelector("#question-space");
var solutions = document.querySelector("#answers");
var highscoreForm = document.querySelector("#interactions");
var points = 0;


var oq1 = {
    answer1: "correct",
    answer2: "incorrect",
    answer3: "incorrect",
    answer4: "incorrect",
}
var oq2 = {
    answer1: "correct",
    answer2: "incorrect",
    answer3: "incorrect",
    answer4: "incorrect",
}

var oq3 = {
    answer1: "correct",
    answer2: "incorrect",
    answer3: "incorrect",
    answer4: "incorrect",
}

var oq4 = {
    answer1: "correct",
    answer2: "incorrect",
    answer3: "incorrect",
    answer4: "incorrect",
}

var q1 = [oq1, "question1", "answer1", "answer2", "answer3", "answer4"];
var q2 = [oq2, "question2", "answer1", "answer2", "answer3", "answer4"];
var q3 = [oq3, "question3", "answer1", "answer2", "answer3", "answer4"];
var q4 = [oq4, "question4", "answer1", "answer2", "answer3", "answer4"];
var allq = [q1, q2, q3, q4];
var newQ = [...allq];

//stop game
var stopGame = function () {
    highscoreForm.style.display = "";
    gameStart.style.display = "";
    problem.style.display = "none";
    solutions.style.display = "none";
    newQ = [...allq];
    points = 0;
}

//no more questions 
var noQuestions = function (x) {
    if (x.length == 0) {
        localStorage.setItem("currentTime", 0);
    }
}

//declare highscore
var highscore = function() {

}


//Generate question
var questionGenerator = function () {
    scoreEl.textContent = points;
    var quiz = Math.floor(Math.random() * newQ.length);
    var currentQuiz = newQ[quiz];
    newQ.splice(quiz, 1)
    problem.textContent = currentQuiz[1];
    for (i = 2; i < currentQuiz.length; i++) {
        var newQuestion = document.createElement("li");
        var newerQuestion = document.createElement("button");
        newQuestion.className = `${currentQuiz[0][`${currentQuiz[i]}`]}`;
        newerQuestion.textContent = `${currentQuiz[i]}`;
        newQuestion.append(newerQuestion);
        solutions.append(newQuestion);
        var correctAnswer = document.querySelector(".correct");
        var incorrectAnswer = document.querySelector(".incorrect");
    }
    correctAnswer.addEventListener("click", function () {
        var currentTime = parseInt(localStorage.getItem("currentTime"));
        points = points + currentTime;
        console.log(points);
        solutions.innerHTML = '';
        scoreEl.textContent = points;
        localStorage.setItem("score", points);
        noQuestions(newQ);
        questionGenerator();
    })
    incorrectAnswer.addEventListener("click", function () {
        var timeChange = parseInt(localStorage.getItem("currentTime"));
        var newTime = timeChange - 5;
        localStorage.setItem("currentTime", newTime);
        solutions.innerHTML = '';
        noQuestions(newQ);
        questionGenerator();
    })
}



//Quiz timer mechanic
var startTimer = function () {
    var startingTime = 30;
    localStorage.setItem("currentTime", startingTime)
    var timeInterval = setInterval(function () {
        var newTime = parseInt(localStorage.getItem("currentTime"))
        newTime--;
        localStorage.setItem("currentTime", newTime)
        timeEl.textContent = newTime + " seconds left";

        if (newTime <= 0) {
            clearInterval(timeInterval)
            timeEl.textContent = "out of time";
            stopGame();
        }
    }, 1000)
}

gameStart.addEventListener("click", function () {
    var newQ = [...allq];
    gameStart.style.display = "none";
    problem.style.display = "";
    solutions.style.display = "";
    startTimer();
    questionGenerator();

})

