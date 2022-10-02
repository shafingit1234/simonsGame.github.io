var buttons = ['green', 'red', 'yellow', 'blue'];

var started = false;
var level = 0;

var usrBtnClk = [];
var gmeBtnClk = [];

$(document).keypress(function () {
    if (started == false)
    {
        $('#level-title').text("Level" + level);
        nextSequence();
        started = true;
    }
})
$('.btn').click(function () {
    var nameClr = $(this).attr('id');
    usrBtnClk.push(nameClr);
    playSound(nameClr);
    animatePress(nameClr);
    checkAnswer(usrBtnClk.length - 1);
})
function checkAnswer(num)
{
    if (gmeBtnClk[num] == usrBtnClk[num])
    {
        if (gmeBtnClk.length == usrBtnClk.length)
        {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
function nextSequence()
{
    usrBtnClk = [];
    level++;
    $("#level-title").text("Level " + level);
    var num = Math.floor((Math.random() * 4));
    var chosenClr = buttons[num];
    gmeBtnClk.push(chosenClr);
    $("#" + chosenClr).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(chosenClr);
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(clr)
{
    var audio = new Audio("./sounds/" + clr + ".mp3");
    audio.play();
}
function startOver()
{
    started = false;
    gmeBtnClk = [];
    level = 0;
}