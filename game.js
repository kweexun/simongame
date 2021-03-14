var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

function nextSequence () {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //$(document).on('keydown', function() {
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor); //)
    level++;
    $("#level-title").html("Level " + level);
};
//};

$(".start").on("click", function() {
    if (!started) {
    nextSequence();
    started = true; }
});

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatedPress(userChosenColor);
    checkAnswer(userClickedPattern.length);
    //setTimeout(function() {nextSequence()}, 1000);
});

function playSound (name) {
    var newSound = new Audio ('sounds/' + name + '.mp3');
    newSound.play();
};

function animatedPress (currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {$("#" + currentColor).removeClass("pressed");}, 100);
};

function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel-1] === gamePattern[currentLevel-1]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {nextSequence()}, 1000);
            userClickedPattern = [];
         };
    }
    else {
        startOver();
        new Audio ('sounds/wrong.mp3').play();
        $("#level-title").html('Game Over, Press <button class="start">Start</button> to Restart.');
        $("body").addClass("game-over");
        setTimeout(function() {$("body").removeClass("game-over");}, 200);

        $(".start").on("click", function() {
            if (!started) {
            nextSequence();
            started = true; }
        });
    };
};

function startOver () {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
};