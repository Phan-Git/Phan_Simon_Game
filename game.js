var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var userChosenColour = "";
var last_pattern = "";

var started = false;
var level = 0;

// Start ?
$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});



// Handling Clicks
$(".btn").click(function(){
        userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        animate_btn(this.id);
        play_sound(this.id);
        check_answer(userClickedPattern.length-1);

    });


// Next Sequence
function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    last_pattern = gamePattern[gamePattern.length-1];
    animate_btn(last_pattern);
    play_sound(last_pattern);
    level++;
    $("#level-title").text("Level Number " + level);

   
}

// Flashing
function animate_btn(input_rand) {
    $("." + input_rand).hide(400).show(1);
}

// Playing Sounds
function play_sound(input_rand) {
    selected_sound = new Audio("sounds/" + input_rand +".mp3");
    selected_sound.play();
}


// Checking User's Answer
function check_answer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();  
            },1000);
        }
    } else { console.log("fail");
             fail_sound = new Audio("sounds/" + "wrong" +".mp3");
             fail_sound.play();
             $("body").addClass("game-over");
             $("#level-title").text("Game Over ! Let's start again.")
             
             setTimeout(function(){
                $("body").removeClass("game-over");
            },4000);
            startOver();
            }

}

// startOver

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}