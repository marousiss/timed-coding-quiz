// Define variables for elements
var highScoreEl = document.getElementById("highscore");
var timerEl = document.querySelector("#timer");
var startquizBtn = document.querySelector("#startquiz"); 
var olEl = document.querySelector("ol");
var titleEl = document.querySelector(".title");
var infoEl = document.querySelector("#info"); 
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
var quiz = [{question: "What operator is used to assign a value to a declared variable?", 
            choices: ["Colon (:)", "Equal sign (=)", "Question mark (?)", "Double-equal (==)"], 
            answer: "Equal sign (=)"},
            {question: "How do we declare a conditional statement in JavaScript?", 
            choices: ["while loop", "for each", "if...else", "for loop"], 
            answer:"if...else"},
            {question: "Commonly used data type do not include:", 
            choices: ["strings", "booleans", "alerts", "numbers"], 
            answer: "alerts"},
            {question: "The condition in an if/else statement is enclosed within ___.", 
            choices: ["quotes", "curly brackets", "parenthesis", "square brackets"], 
            answer: "parenthesis"},
            {question: "Arrays in JavaScript can be used to store ___.", 
            choices: ["numbers and strings", "other arrays", "booleans", "all of the above"], 
            answer: "all of the above"},
            {question: "String values must be enclosed within ___ when being assigned to variables.", 
            choices: ["commas", "curly brackets", "quotes", "parenthesis"], 
            answer: "quotes"}
    ]


// Type const variables
const timeText = "Time: ";
const scoreText = "View highscore";
const h1Text = "Coding Quiz Challenge";
const initText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorect answers will penalize your score/time by ten seconds!"


// Start quiz screen
function initialQuiz(){   
    timeLeft =  quiz.length * 12;
    titleEl.innerHTML = h1Text;    
    infoEl.innerHTML = initText;
    highScoreEl.innerHTML= scoreText;
    timerEl.innerHTML = timeText + timeLeft;
    olEl.innerHTML = "";
    startquizBtn.setAttribute("style",  "display:block;");
    startquizBtn.setAttribute("class", "button");
    highScoresPanelEl.innerHTML = ""; 
    
}


function renderQuestion(index) {
    // clean uo the render screen 
    //messageEl.textContent = "The answer is: ";
    initializeElements();

    var quizQuest = quiz[index];
    infoEl.innerHTML = quizQuest.question;
    var choices = quizQuest.choices;
    var count = 0;
    // Display multiple choices 
    for (var i = 0; i < choices.length;  i++ ) {
        var choice = choices[i]; 
        var li = document.createElement("li"); 
        li.setAttribute("style", "padding: 5px;");
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("style", "background-color: lightskyblue; text-decoration: none; color: black;")
        a.setAttribute("data-index", index);
        count++;
        a.textContent = count + ".  " + choice;
        li.appendChild(a);
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
    document.querySelector("#initials-input").value = "";

}
// Display Highscores page
function renderquizscores() {
    initialsEl.setAttribute("style", "display: none;");
    postscoreBtn.setAttribute("style", "display: none;");
    infoEl.innerHTML = "";
    timerEl.innerHTML = "";
    highScoresPanelEl.innerHTML = "";
    highScoreEl.innerHTML = "";

    titleEl.innerHTML = "Highscores";

    // Create DOM elemts
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

    // Get the stored value values 
    var myInitials = localStorage.getItem("initials");
    var score = localStorage.getItem("score");

    if (myInitials !== null) {
        highscoreInfoEl.textContent = myInitials + " - " + score; 
    } 

}

// Start timer
function startTimer(){

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

    }, 1000)
}

goBackBtn.addEventListener("click", function(){
    initialQuiz();
});


// Add event click to clearHighScoresBtn
clearHighScoresBtn.addEventListener("click", function(){

    localStorage.removeItem('initials');
    localStorage.removeItem('score');
    initializeElements();
    renderquizscores();

});

// Attach event listener to highscore paragraph element
highScoreEl.addEventListener("click", function(event){
    // stop the time interval in case is on
    if(timeInterval) {
        clearInterval(timeInterval);
    }
    initializeElements();
    renderquizscores();
});


// Attach event listener to postscore button element
postscoreBtn.addEventListener("click", function(event){
    event.preventDefault();

    var myInitials = document.querySelector("#initials-input").value; 
    if (myInitials === ""){
        alert("Initials can not be blank");
        return;
    } 

    // Compare current score with saved score. Store the highest score
    var highscore = localStorage.getItem("score");
    if (highscore === null || highscore < timeLeft ){
        highscore = timeLeft;  
    } 
 
    myInitials = myInitials.toUpperCase();
    localStorage.setItem("initials", myInitials);
    localStorage.setItem("score", highscore);
    renderquizscores();

});

// Attach event listener to <ol> element
olEl.addEventListener("click", function(event){
    var element = event.target;

    // Return if element is not a link 
    if (element.matches("a") === false){
        return;
    }
       
    var choice = element.innerHTML.trim();
    var index = element.dataset.index; 

    if (choice.includes(quiz[index].answer)){
        messageEl.setAttribute("style", "color: green");
        messageEl.textContent = "Correct!";
    } else {
        // Subtract ten from timer for every wrong question 
        timeLeft = timeLeft - 10;
        timerEl.innerHTML = timeText + timeLeft;
        messageEl.setAttribute("style", "color: red");
        messageEl.textContent = "Wrong";
    }

    
    // Get the next quiz question 
    var myTimeout = setTimeout(function() {
        idx++;
        if (idx < quiz.length) {
            renderQuestion(idx);
        } else {
            clearInterval(timeInterval);
            clearTimeout(myTimeout);
            if (timeLeft < 0) {
                timeLeft = 0   
            }
            timerEl.innerHTML = timeText + timeLeft;
            finalScore();
        }
        
    }, 500);

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

