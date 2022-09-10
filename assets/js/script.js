// Define variables for elements
var highScoreEl = document.getElementById("highscore");
var startquizBtn = document.querySelector("#startquiz"); 
var olEl = document.querySelector("ol");
var titleEl = document.querySelector(".title");
var infoEl = document.querySelector("#info"); 
var timerEl = document.querySelector("#timer");
//var timeEl = document.querySelector("#time");
var messageEl = document.querySelector("#message");
var postscoreBtn = document.querySelector("#post-score");
var initialsEl = document.querySelector(".initials"); 
var highScoresPanelEl = document.querySelector(".highscores");

// Create button elements
var goBackBtn = document.createElement("button");
var clearHighScoresBtn = document.createElement("button");


var timeLeft = 0;
var idx = 0;
var wrongAnswerCounter = 0;
var timeInterval;

// Array to hold the multiple choice questions
var quiz = [{question: "Commonly used data type do not include:", choices: ["strings", "boolleans", "alerts", "numbers"], answer: "alerts"},
            {question: "The condition in an if/else statement is enclosed within ___.", choices: ["quotes", "curly brackets", "parenthesis", "square brackets"], answer: "parenthesis"},
            {question: "Arrays in JavaScript can be used to store ___.", choices: ["numbers and strings", "other arrays", "booleans", "all of the above"], answer: "all of the above"},
            {question: "String values must be enclosed within ___ when being assigned to variables.", choices: ["commas", "curly brackets", "quotes", "parentesis"], answer: "quotes"},
    ]


// Type const variables
const timeText = "Time: ";
const h1Text = "Coding Quiz Challenge";
const initText = "Try to answer the following code-related questions within the time limit. keep in mind that incorect answers will penalize your score/time by ten seconds!"


// Start quiz screen
function initialQuiz(){   
    wrongAnswerCounter = 0;
    titleEl.innerHTML = h1Text;    
    infoEl.innerHTML = initText;
    timerEl.innerHTML = timeText;
    olEl.innerHTML = "";
    startquizBtn.setAttribute("style",  "display:block;");
    highScoresPanelEl.innerHTML = "";
    timeLeft =  quiz.length * 10;
    
}


function renderQuestion(index) {
    // clean uo the render screen 
    messageEl.textContent = "The answer is: ";
    initializeElements();

    var quizQuest = quiz[index];
    infoEl.innerHTML = quizQuest.question;
    var choices = quizQuest.choices;
    // Display multiple question choices
    for (var i = 0; i < choices.length;  i++ ) {
        var choice = choices[i]; 
        var li = document.createElement("li"); 
        li.textContent = choice;
        li.setAttribute("style", "background-color: red;")
        if (choice === quizQuest.answer) {
            li.setAttribute("data-answer", "correct");
        } else {
            li.setAttribute("data-answer", "wrong");
        }
        olEl.appendChild(li);
    } 
   
}

function initializeElements() {
    // initialize title  element
    titleEl.innerHTML = ""; 
    
    // Initialize info element
    infoEl.innerHTML = "";

    // Hide the start quiz button
    startquizBtn.setAttribute("style",  "display:none;");

    // initialize ol element
    olEl.innerHTML = "";

    //inititalize message element
    messageEl.innerHTML = "";
    

}
// Display final score page
function finalScore() {
    initializeElements();
    titleEl.innerHTML = "All done!"; 
    infoEl.innerHTML = "Your final score is " + timeLeft + ".";
    var initialsEl = document.querySelector(".initials");
    initialsEl.setAttribute("style", "display: block;");
    postscoreBtn.setAttribute("style", "display: block;");

}
// Display Highscores page
function renderquizscores() {
    initialsEl.setAttribute("style", "display: none;");
    postscoreBtn.setAttribute("style", "display: none;");
    infoEl.innerHTML = "";
    timerEl.innerHTML = "";
    highScoresPanelEl.innerHTML = "";
    titleEl.innerHTML = "Highscores";

    var highscoreInfoEl = document.createElement("p");
    highscoreInfoEl.setAttribute("class", "highscoreInfo");
    
    goBackBtn.setAttribute("type", "submit");
    goBackBtn.setAttribute("class", "highscore-btn");
    goBackBtn.textContent = "Go Back";

    clearHighScoresBtn.setAttribute("type", "submit");
    clearHighScoresBtn.setAttribute("class", "highscore-btn");
    clearHighScoresBtn.textContent = "Clear Highscores";

    highScoresPanelEl.appendChild(highscoreInfoEl);
    highScoresPanelEl.appendChild(goBackBtn);
    highScoresPanelEl.appendChild(clearHighScoresBtn);

    // Get the stored values 
    var myInitials = localStorage.getItem("initials");
    var score = localStorage.getItem("score");

    if (myInitials !== null) {
        highscoreInfoEl.textContent = myInitials + " - " + score; 
    } 

}

// Start timer
function startTimer(){

    timeLeft =  quiz.length * 10;
    timeInterval = setInterval(function(){
        
        if (timeLeft > 0){
            timerEl.innerHTML = timeText + timeLeft;
            timeLeft--;
        } else {
            clearInterval(timeInterval);
            timeLeft = 0;
            timerEl.innerHTML = timeText + timeLeft;
            finalScore();
        }

    }, 2000)
}

goBackBtn.addEventListener("click", function(){
    initialQuiz();
});

clearHighScoresBtn.addEventListener("click", function(){

    localStorage.removeItem('initials');
    localStorage.removeItem('score');
    initializeElements();
    renderquizscores();

});

// Attach event listener to highscore paragraph element
highScoreEl.addEventListener("click", function(event){
    initializeElements();
    renderquizscores();
});

// Attach event listener to final post score  button
postscoreBtn.addEventListener("click", function(event){
    event.preventDefault();

    var myInitials = document.querySelector("#initials-input").value; 

    alert("Initials: " + myInitials);

    if (myInitials === ""){
      alert("Initials can not be blank");
    } else {
        // store score to local storage
        localStorage.setItem("initials", myInitials);
        localStorage.setItem("score", timeLeft);
        renderquizscores();
    }

});

// Attach event listener to <ol> element
olEl.addEventListener("click", function(event){
    var element = event.target;
    var myanswer = element.dataset.answer; 
    
    // Subtract ten from timer for every wrong question 
    if (myanswer === "wrong") {
        timeLeft = timeLeft - 10;
        timerEl.innerHTML = timeText + timeLeft;
        messageEl.setAttribute("style", "color: red");
        messageEl.textContent = myanswer;
    } else {
        messageEl.setAttribute("style", "color: green");
        messageEl.textContent = myanswer + "!";
    }

    
    // Get the next quiz question 
    var myTimeout = setTimeout(function() {
        idx++;
        if (idx < quiz.length) {
            renderQuestion(idx);
        } else {
            clearInterval(timeInterval);
            if (timeLeft < 0) {
                timeLeft = 0   
            }
            timerEl.innerHTML = timeText + timeLeft;
            finalScore();
        }
        
    }, 500);

    /** 
    idx++;
    if (idx < quiz.length) {
        renderQuestion(idx);
    } else {
        clearInterval(timeInterval);
        if (timeLeft < 0) {
            timeLeft = 0   
        }
        timeEl.innerHTML = timeLeft;
        finalScore();
    }
    */  

});


// Attach event listener to start quiz button element
startquizBtn.addEventListener("click", function(event){
    event.preventDefault();
    // Start timer
    startTimer();

    // Start quiz 
    idx = 0;
    renderQuestion(idx);
});

initialQuiz();
