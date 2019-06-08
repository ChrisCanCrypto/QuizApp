// Global Vars
let questionNumber = 0;
let score = 0;
let isFinalQuestion = false;

function startQuiz(){
    $('.start-button').on('click', function(){
        // console.log("linked and working");
        $('.quiz-start ').addClass('hidden');
        $('.question-form').removeClass('hidden');
        renderQuestion();
        updateQuesitonNumberText();
    });
}

function updateQuesitonNumberText(){
    $('.question-number').text(questionNumber+1);
}

function updateQuestionNumber(){
    questionNumber++;
    if(questionNumber === QUESTIONS.length-1){
        isFinalQuestion = true;
    }
}

function updateScore(){
    score++;
    $('.score').text(score);
}    

function createQuestion(){
    let question = QUESTIONS[questionNumber].question;
    return question;
}

function createAnswers(){
    let totalAnswers = QUESTIONS[questionNumber].answers.length;
    let answersHTML = '<fieldset>'
    for(let i = 0; i < totalAnswers; i++){
        answersHTML += '<label class="answerOption"> <input type="radio" value="ans'+i+'" name="answer" required><span>';
        answersHTML += QUESTIONS[questionNumber].answers[i];
        answersHTML += '</span></label>'
    }
    answersHTML += '<button type="submit" class="submit-button">Submit</button></fieldset>'
    return answersHTML;
}


function renderQuestion(){
    $('.question-text').html(createQuestion());
    $('form').html(createAnswers());
}

function submitAnswer(){
    $('form').on('submit', function(event){
        event.preventDefault();
        let userAnswer = $('input:checked');
        let correctAnswer = QUESTIONS[questionNumber].correctAnswer;
        updateResultInfo();
        if(userAnswer.val() === correctAnswer){
            correctResponse();
        }else{
            wrongResponse();
        }
    })
}

function updateResultInfo(){
    $('.response-img').attr('src', QUESTIONS[questionNumber].image);
    $('.response-img').attr('alt', QUESTIONS[questionNumber].alt);
    $('.response-flavor').text(QUESTIONS[questionNumber].flavorText);
}

function updateResultFlavor(){

}

function correctResponse(){

    updateScore();
    if (isFinalQuestion === true){
        $('.next-question').addClass('hidden');
        $('.view-results').removeClass('hidden');
    }
    $('.question-form').addClass('hidden');
    $('.correct-ans').removeClass('hidden');
    $('.response').removeClass('hidden');
}

function wrongResponse(){

    if (isFinalQuestion === true){
        $('.next-question').addClass('hidden');
        $('.view-results').removeClass('hidden');
    }
    $('.question-form').addClass('hidden');
    $('.wrong-ans').removeClass('hidden');
    $('.response').removeClass('hidden');
}

function nextQuesiton(){

    $('.next-question').on('click', function(){
        $('.question-form').removeClass('hidden');
        $('.correct-ans').addClass('hidden');
        $('.wrong-ans').addClass('hidden');
        $('.response').addClass('hidden');
        updateQuestionNumber();
        updateQuesitonNumberText();
        renderQuestion()
    });

}

function viewResults(){
    $('.view-results').on('click', function(){
        $('.response').addClass('hidden');
        $('.results').removeClass('hidden');
        if(score > 3){
            $('.high-score').removeClass('hidden');
        }else if(score < 2){
            $('.low-score').removeClass('hidden');
        }else{
            $('.med-score').removeClass('hidden');
        }
    });
}

function createQuiz(){
    startQuiz();
    submitAnswer();
    nextQuesiton();
    viewResults();
}

$(createQuiz);


