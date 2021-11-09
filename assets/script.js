var begin = document.getElementById('startButton');
var timeEl = document.getElementById('timer');
var quizSection = document.getElementById('quizSection');
var points = document.getElementById('score');
var ans = document.getElementById('answers');
var quest = document.getElementById('question');
var form = document.getElementById('challenger');
var res = document.getElementById('res');
var leader = document.getElementById('leader');
var leaderboard = document.getElementById('leaderboard');
let x;
let qarray

var question = [
    {
        prompt: 'document.querySelectorAll() will return what when called',
        selection: [
            {
                answer: 'The first instance of an element matching the call',
                correct: false
            },
            {
                answer: 'A string of all the available elments matching that string',
                correct: false
            },
            {
                answer: 'An array of all the available elments matching that string',
                correct: false
            },
            {
                answer: 'An Nodelist of all the available elments matching that string',
                correct: true
            },
        ]
    }, {
        prompt: 'Async functions allow the code too',
        selection: [
            {
                answer: 'Run multiple functions at the same',
                correct: false
            },
            {
                answer: 'Run the code sequentially without interruptions',
                correct: false
            },
            {
                answer: 'Pause the code and await completion where specified',
                correct: true
            },
            {
                answer: 'Runs all the code simultaenously',
                correct: false
            },
        ]
    }, {
        prompt: 'OOP stands for ',
        selection: [
            {
                answer: 'Operationally Optimized Prgramming',
                correct: false
            },
            {
                answer: 'Object Oriented Programming',
                correct: true
            },
            {
                answer: 'Object Optimized Programming',
                correct: false
            },
            {
                answer: 'Operationally Oriented Programming',
                correct: false
            },
        ]
    }, {
        prompt: 'Error code 497',
        selection: [
            {
                answer: 'The inability to dowload an app to a cellular device',
                correct: true
            },
            {
                answer: 'Authorization not provided',
                correct: false
            },
            {
                answer: 'Certificate required',
                correct: false
            },
            {
                answer: 'The token being utilized is invalid',
                correct: false
            },
        ]
    },
]


var increaseScore = () => {
    currentScore = parseInt(localStorage.getItem('score'));
    increment = parseInt(localStorage.getItem('currentTime'));
    newScore = currentScore + increment;
    localStorage.setItem('score', newScore);
    points.textContent = `Score: ${localStorage.getItem('score')}`;
}
var decreaseTime = () => {
    time = parseInt(localStorage.getItem('currentTime'));
    newTime = time - 2;
    localStorage.setItem('currentTime', newTime);
}
var gameOver = () => {
    localStorage.setItem("currentTime", 0)
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    var initials = document.getElementById('initials');
    player = localStorage.setItem('player', initials.value)
    leader.textContent = `${localStorage.getItem('player')}: ${localStorage.getItem('score')}`
    form.style.display = 'none'

})
leaderboard.style.display = 'none'

var generateQ = () => {
    points.textContent = `Score: ${localStorage.getItem('score')}`;
    ans.innerHTML = '';
    quest.innerHTML= '';
    if (x < question.length) {
        let chosen = Math.floor(Math.random() * qarray.length);
        quest.textContent = qarray[chosen].prompt;
        for (i = 0; i < question[0].selection.length; i++) {
            var answer = document.createElement('button');
            answer.classList.add(`answer`);
            answer.id = `${qarray[chosen].selection[i].correct}`
            answer.textContent = `${qarray[chosen].selection[i].answer}`;
            ans.append(answer);
        }
        var correct = document.getElementById('true')
        var incorrect = document.querySelectorAll('#false');

        for (let i = 0; i < incorrect.length; i++) {
            incorrect[i].addEventListener('click', function (e) {
                e.preventDefault();
                res.textContent = "incorrect"
                qarray.splice(chosen, 1)
                generateQ();
                decreaseTime();
            });
        }


        correct.addEventListener('click', function (e) {
            res.textContent = "correct"
            e.preventDefault();
            qarray.splice(chosen, 1)
            increaseScore();
            generateQ();
        })
        x += 1
    } else {
        gameOver();
    }

};
var startTimer = function () {
    var startingTime = 20;
    localStorage.setItem("currentTime", startingTime)
    var timeInterval = setInterval(function () {
        var newTime = parseInt(localStorage.getItem("currentTime"))
        newTime--;
        localStorage.setItem("currentTime", newTime)
        timeEl.textContent = newTime + " seconds left";

        if (newTime <= 0) {
            clearInterval(timeInterval)
            ans.innerHTML = '';
            timeEl.textContent = "Quiz over";
            quizSection.style.display = 'none';
            begin.style.display = '';
            leaderboard.style.display = '';
            form.style.display=''

        }
    }, 1000)
};

var gameStart = async () => {
    x = 0
    qarray = question.map(x => x);
    localStorage.setItem('score', 0)
    begin.style.display = 'none';
    quizSection.style.display = '';
    startTimer();
    generateQ();
};

begin.addEventListener('click', function (e) {
    e.preventDefault;
    leaderboard.style.display = 'none'
    gameStart()
});