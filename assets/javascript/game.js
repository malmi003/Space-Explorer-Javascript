/*

- * make the distance between ship and moon that many spaces
- * move space ship towards moon same number of space they guessed
- * need to add function that changes "distance" between planets so can move along it

for animation, can determine how many pixels down the top icon is (64px tall maybe, pluto is 32) and then to the top of the bottom icon. Determine how many pxs that is, then divide it by the targetNumber. Then move the rocket up by that many pixels each time.

*/
var loserArray = [
    {
        message: "Uh oh! Trouble with the locals...better circle back.",
        icon: "alien.png",
    },
    {
        message: "Whoops! Your star map was upside down. I think we're going in circles.",
        icon: "big-dipper.png",
    },
    {
        message: "Black hole ahead. All engine thrusters in reverse!",
        icon: "black-hole.png",
    },
    {
        message: "Not the kind of shower an astronaut needs. Best to double back until it's over.",
        icon: "meteorites.png",
    },
    {
        message: "Houston, we have a problem. Let's hope their hyperspace tracking is down.",
        icon: "space-station.png",
    },
    {
        message: "Guess you were staring at the sun too long. That'll set you back.",
        icon: "sun.png",
    }
];

var winnerArray = [
    {
        message: "Ready for lift off!",
        planetIcon: "planet-earth.png",
        planetIconSmall: "planet-earth24.png",
    },
    {
        message: "Eyes toward the moon!",
        planetIcon: "moon.png",
        planetIconSmall: "moon24.png",
    },
    {
        message: "Nice! Onto the red planet.",
        planetIcon: "mars.png",
        planetIconSmall: "mars24.png",
    },
    {
        message: "Good work! Jupiter is on the horizon.",
        planetIcon: "jupiter.png",
        planetIconSmall: "jupiter24.png",
    },
    {
        message: "Great adding! Onto Saturn with the rings.",
        planetIcon: "saturn.png",
        planetIconSmall: "saturn24.png",
    },
    {
        message: "Woo! 7th planet from the sun, headed to Neptune next!",
        planetIcon: "uranus.png",
        planetIconSmall: "uranus24.png",
    },
    {
        message: "Way to go! Since we're already out here might as well check out Neptune.",
        planetIcon: "neptune.png",
        planetIconSmall: "neptune24.png",
    },
    {
        message: "Look how far you've come! Downgraded from the planets, not our hearts - next is Pluto.",
        planetIcon: "pluto.png",
        planetIconSmall: "pluto24.png",
    },
    {
        message: "Wow! You're too good for this solar system. Can you do it one more time?",
        planetIcon: "milky-way.png",
        planetIconSmall: "milky-way.png",
    },
    {
        message: "Congratulations, Space Explorer!<br><br>We've reached the end of OUR journey. You're the aliens' problem now.",
        planetIcon: "astronaut1.png",
        planetIconSmall: "astronaut24.png",
    }
]

// ----------------declaring variables-----------------
var randomTargetNumber = 0;
var randomIconNumber = 0;
var totalScore = 0;
var winCount = 0;
var lossCount = 0;
var currentWinArrayIndex = 1;
var currentLoserArrayIndex = 0;
var additionValue = 0;

var currentPlanetY = 0;
var newLocationOfRocket = 0;
var distanceBetweenPlanets = 0;
var distanceToMoveEach = 0;
var distanceToMove = 0;
var newLocationMove = "";

    // ----------------defining functions-----------------
    function assignTargetNumber() {
        //FOR TESTING PURPOSES!
        // randomTargetNumber = Math.floor(Math.random() * 10);
        randomTargetNumber = Math.floor(Math.random() * 102) + 19;
        $("#targetNumber").html(randomTargetNumber);
    }

function getRandomIconValue() {
    //FOR TESTING PURPOSES!
    // randomIconNumber = Math.floor(Math.random() * 4);
    randomIconNumber = Math.floor(Math.random() * 12) + 1;
    return randomIconNumber;
}
function assignIconValues() {
    // * better way to pull this array vs just hard coding it?
    var iconArray = [$("#icon-1"), $("#icon-2"), $("#icon-3"), $("#icon-4")]
    for (var btn in iconArray) {
        iconArray[btn].val(getRandomIconValue());
    }
}

function getLoserArrayIndex() {
    var loserIndex = Math.floor(Math.random() * loserArray.length);
    return loserIndex;
}

function reset() {
    assignTargetNumber();
    assignIconValues();
    totalScore = 0;
    $("#score").html(totalScore);

    ////left off here......
    //after a page has been reset, need to reevaluate distance from planets and put rocket there plus a little extra

    currentPlanetY = $("#currentPlanet").offset().top;
    console.log(currentPlanetY);
    console.log($("#currentPlanet").offset().top);
    
    $("#rocket").offset({top: currentPlanetY});
    
    distanceBetweenPlanets = currentPlanetY - $("#nextPlanet").offset().top;
    
    newLocationOfRocket = currentPlanetY;
    $("#rocket").animate({top: newLocationOfRocket}, "fast")
    // console.log(newLocationOfRocket)
    console.log(currentPlanetY);
    console.log($("#rocket").offset().top)
    console.log($("#currentPlanet").offset().top)
    
}

$("#resetButton").on("click", function () {
    randomTargetNumber = 0;
    randomIconNumber = 0;
    winCount = 0;
    lossCount = 0;
    currentWinArrayIndex = 1;
    reset();

    highlightCurrentPlanet();

    $("#winCount").html(winCount);
    $("#lossCount").html(lossCount);
    $("#status").html(winnerArray[currentWinArrayIndex].message);
    $("#nextPlanet").attr("src", "assets/images/" + winnerArray[currentWinArrayIndex].planetIcon);
    $("#currentPlanet").attr("src", "assets/images/" + winnerArray[currentWinArrayIndex - 1].planetIcon);
    $("#resetButtonSection").addClass("d-none");
    $("#totalTarget").removeClass("d-none");
    $("#totalScore").removeClass("d-none");
    $("#currentPlanet").removeClass("d-none");
    $("#rocket").removeClass("d-none");
    $("#nextPlanet").removeClass("moveRocketPerson");
})

function highlightCurrentPlanet() {
    var currentPlanetId = "#planet-" + (currentWinArrayIndex - 1);
    var currentLiItem = $(currentPlanetId);

    for (var i = 0; i < (winnerArray.length - 1); i++) {
        var liItem = "#planet-" + i;

        if (liItem == currentPlanetId) {
            currentLiItem.addClass("active");
        } else {
            for (var y = 0; y < (winnerArray.length - 1); y++) {
                var pastPlanet = "#planet-" + i;
                $(pastPlanet).removeClass("active");
            }
        }
    }
}

function moveTheRocket() {
    distanceToMoveEach = distanceBetweenPlanets / randomTargetNumber;
    distanceToMove = distanceToMoveEach * additionValue;
    newLocationOfRocket -= distanceToMove;
    $("#rocket").animate({top: newLocationOfRocket}, "fast");
}


// ----------------playing the game code-----------------

reset();

// var rocketInitialize = currentPlanetY - 196;
// $("#rocket").offset({top: rocketInitialize});

highlightCurrentPlanet();
currentLoserArrayIndex = getLoserArrayIndex();
$("#nextPlanet").attr("src", "assets/images/" + winnerArray[currentWinArrayIndex].planetIcon);
$("#currentPlanet").attr("src", "assets/images/" + winnerArray[currentWinArrayIndex - 1].planetIcon);


$(".icon").on("click", function () {
    additionValue = parseInt($(this).val());
    totalScore += additionValue;
    $("#score").html(totalScore);
    currentLoserArrayIndex = getLoserArrayIndex();
    
    moveTheRocket();

    if (totalScore === randomTargetNumber) {
        currentWinArrayIndex++;
        $("#status").html(winnerArray[currentWinArrayIndex].message);
        $("#nextPlanet").attr("src", "assets/images/" + winnerArray[currentWinArrayIndex].planetIcon);
        $("#currentPlanet").attr("src", "assets/images/" + winnerArray[currentWinArrayIndex - 1].planetIcon);
        $("#statusIcon").attr("src", "");
        winCount++;
        $("#winCount").html(winCount);

        var nextPlanetSrc = $("#nextPlanet").attr("src");
        if (nextPlanetSrc === "assets/images/astronaut1.png") {
            $("#currentPlanet").addClass("d-none");
            $("#rocket").addClass("d-none");
            $("#resetButtonSection").removeClass("d-none");
            $("#nextPlanet").addClass("moveRocketPerson");
            $("#totalTarget").addClass("d-none");
            $("#totalScore").addClass("d-none");
        } else {
            reset();
        }

    } else if (totalScore > randomTargetNumber) {
        if (currentWinArrayIndex > 1) {
            currentWinArrayIndex--;
        }
        getLoserArrayIndex();
        $("#status").html(loserArray[currentLoserArrayIndex].message);
        $("#statusIcon").attr("src", "assets/images/" + loserArray[currentLoserArrayIndex].icon);
        $("#nextPlanet").attr("src", "assets/images/" + winnerArray[currentWinArrayIndex].planetIcon);
        $("#currentPlanet").attr("src", "assets/images/" + winnerArray[currentWinArrayIndex - 1].planetIcon);
        lossCount++;
        $("#lossCount").html(lossCount);
        reset();
    }

    highlightCurrentPlanet();
    
})




