var allQuestions = [
    {
        question: 'What city was Full House Based In?',
        choices: ['San Francisco', 'Portland', 'Albuquerque', 'Chicago'],
        correctAnswer:0,
        answerText: 'San Francisco'
    },
    {
        question: 'What was Djs full name?',
        choices: ['Daisy Jane Rebecca Tanner', 'Dorothy Jane Suzie Tanner', 'Diane Judith Tanner', 'Donna Jo Margaret Tanner'],
        correctAnswer:3,
        answerText: 'Donna Jo Margaret Tanner'
    },
    {
        question: 'What was Uncle Jesses last name during the 1st season?',
        choices: ['Cochran', 'Stamos', 'Catsopolis', 'Gladstone'],
        correctAnswer:0,
        answerText: 'Cochran'
    },
    {
        question: 'What famous talent TV show did Joey Gladstone become a contestant on and lost against Steve Odekirk?',
        choices: ['American Idol', 'Star Search', 'Last Comic Standing', 'Hee-Haw'],
        correctAnswer:1,
        answerText: 'Star Search'
    },
    {
        question: 'Who has starred on Full House?',
        choices: ['Kirk Cameron', 'Steve Urkel (Jaleel White)', 'The Beach Boys', 'All of the Above'],
        correctAnswer:3,
        answerText: 'All of the Above'
    }
];

//globals
var questionCounter = 0;
var numCorrect =  0;
var questionWrapper = document.getElementById('question-wrapper');
var buttonContainer = document.getElementById('button-container');
var button = document.createElement('button');
button.id = 'next-question';
button.innerHTML = 'Next Question';
var startOverButton = document.createElement('button');
startOverButton.innerHTML = 'Play Again?';
var progressContainer = document.getElementById('progress-container');
var progress = document.createElement('div');
progress.className = 'progress-bar';
progress.style.width = 0 + '%';
progressContainer.appendChild(progress);
var headers = document.getElementsByTagName('h1');
headers[0].textContent = document.title;
var wrongAnswerArray = [];

console.log(headers);

function loadQuestion(){
    //reset the html after each button click
    questionWrapper.innerHTML = '';
    //create the content div
    var content = document.createElement('div');
    content.id = 'content';

    //create the question header
    var questionLabel = document.createElement('h2');
    questionLabel.id = 'question';

    content.appendChild(questionLabel);
    //inject the value from the question object key
    questionLabel.innerHTML = allQuestions[questionCounter].question;

    //create unordered list to store choices
    var choicesList = document.createElement('ul');
    content.appendChild(choicesList);

    for(var i = 0; i < allQuestions[questionCounter].choices.length; i++){
        //create list item
        var listItem = document.createElement('li');

        var spanRadio = document.createElement('span');
        spanRadio.className = 'radio';
        var spanValue = document.createElement('span');
        spanValue.className = 'radio-value';
        //create the radio button
        var radioButton = document.createElement('input');
        //attach attributes to the radio button
        radioButton.type = 'radio';
        radioButton.id = 'choice' + '-' +  i;
        radioButton.name = 'answer-choice';
        radioButton.value = i;
        //create the content label
        var contentLabel = document.createElement('label');
        var choiceText = document.createTextNode(allQuestions[questionCounter].choices[i]);

        choicesList.appendChild(listItem);
        listItem.appendChild(contentLabel);
        contentLabel.appendChild(spanRadio);
        spanRadio.appendChild(radioButton);
        spanRadio.appendChild(spanValue);
        contentLabel.appendChild(choiceText);
    }
    //content.insertBefore(questionLabel, content.nextSibling);
    //append the content div to the question wrapper
    questionWrapper.appendChild(content);
}

function endText(){
    var scoreText = document.createTextNode('You scored ' + numCorrect + ' out of ' + allQuestions.length);
    var p1 = document.createElement('p');
    var p2 = document.createElement('p');
    var p3 = document.createElement('p');
    questionWrapper.innerHTML = '';
    questionWrapper.appendChild(p1);
    questionWrapper.appendChild(p2);
    p1.appendChild(scoreText);

    buttonContainer.innerHTML = '';
    buttonContainer.appendChild(startOverButton);

    function getWrongAnswers(){
        for(var i = 0; i < wrongAnswerArray.length; i++){
            //grab the value from the array index
            var wrongAnswerVal = wrongAnswerArray[i].valueOf();
            console.log(allQuestions[wrongAnswerVal].question);
            var wrongQuestion = document.createElement('span');
            var wrongQuestionAnswer = document.createElement('span');
            wrongQuestion.innerHTML = 'Question: ' + allQuestions[wrongAnswerVal].question + '<br>';
            wrongQuestionAnswer.innerHTML = 'Answer: ' + allQuestions[wrongAnswerVal].answerText + '<br><br>';
            questionWrapper.appendChild(wrongQuestion);
            questionWrapper.appendChild(wrongQuestionAnswer);
        }
    }

    if(numCorrect === allQuestions.length){
        p2.innerHTML = 'You got it Dude! You must have dated Kimmy Gibbler or Uncle Jesse or something. Now enjoy a medley by your favorite <a target="_blank" href="https://www.youtube.com/watch?v=Dor96YnM_qo">band</a>.';
    }
    else if(numCorrect === 0){
        p2.innerHTML = 'How Rude! Why have you not seen the best show in the whole wide universe!';
        questionWrapper.appendChild(p3);
        p3.innerHTML = 'Here is what you answered incorrectly:';
        getWrongAnswers();
    }
    else{
        p2.innerHTML = 'Have Mercy! So you have never attended a Jesse & The Rippers gig, but at least you have seen the show.';
        questionWrapper.appendChild(p3);
        p3.innerHTML = 'Here is what you answered incorrectly:';
        getWrongAnswers();
    }
}

function progressBar(){
    var currentProgress = (questionCounter / allQuestions.length) * 100;
    progress.style.width = currentProgress + '%';
}

function checkAnswer(){
    var currentRadio = document.getElementsByTagName('input');
    var radioValue;
    var isChecked = false;
    for(var i = 0; i < currentRadio.length; i++){
        if(currentRadio[i].checked){
            radioValue = parseInt(currentRadio[i].value);
            isChecked = true;
            //break out of the loop once statment is evaluated
            //if the loop isn't broken out of it will keep iterating through the radios and potentially evaluate as false
            break;
        }
        else{
            isChecked = false;
        }
    }
    if(isChecked === true){
        if(radioValue === allQuestions[questionCounter].correctAnswer){
            numCorrect++;
        }
        if(radioValue !== allQuestions[questionCounter].correctAnswer){
            wrongAnswerArray.push(questionCounter);
            console.log(wrongAnswerArray);
        }
        if(questionCounter === allQuestions.length - 1){
            endText();
        }
        questionCounter++;
        progressBar();
    }
    else if(isChecked === false){
        window.alert('How rude! Please make a selection.');
    }
}

//app init
function init(){
    buttonContainer.appendChild(button);
    loadQuestion();
}

startOverButton.onclick = function(){
    //reset vars and flush HTML
    questionCounter = 0;
    numCorrect = 0;
    wrongAnswerArray = [];
    buttonContainer.innerHTML = '';
    progress.style.width = 0 + '%';
    init();
};

button.onclick = function(){
    checkAnswer();
    if(questionCounter < allQuestions.length){
        loadQuestion();
    }
};

//init the app after window load
window.onLoad = init();
