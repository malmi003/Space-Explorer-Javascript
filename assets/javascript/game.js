/*

- onload, generate 1 random number between 19-120 & display on page 
    - * make the distance between ship and moon that many spaces
- generate 4 more random numbers between 1-12 and assign to icons1-4
- when player clicks an icon, that number is added to their score

- * if their score is <= the targetNumber, keep guessing and adding click numbers to score
    - * move space ship towards moon same number of space they guessed

- * if their score exceeds the targetNumber they lose
    - * add to loss count, display loss message, reset the numbers, a meteor shower made them start mission over

- * if their score == target number, they win, add to win count, display win message, reset game

- * graphic makes it to moon on win and then displays something clever, maybe change out planets so go from earth to moon, mars, jupiter, uranus, 
    - * loss sends them back to earth prematurely, displays loser message and icon.
- * need to add function that changes "distance" between planets so can move along it

*/
var loserArray = [
    {
        message: "Uh oh! Trouble with the locals...better circle back.",
        icon: "alien.png",
    },
    {
        message: "Whoops! Your star map upside down. I think we're going in circles.",
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
    },
    {
        message: "Eyes towards the moon!",
        planetIcon: "moon.png",
    },
    {
        message: "Nice! Onto the red planet.",
        planetIcon: "mars.png",
    },
    {
        message: "Good work! Jupiter is on the horizon.",
        planetIcon: "jupiter.png",
    },
    {
        message: "You can really add, huh? Onto Saturn with the rings.",
        planetIcon: "saturn.png",
    },
    {
        message: "Woo! 7th planet from the sun, headed to Neptune next!",
        planetIcon: "uranus.png",
    },
    {
        message: "Way to go! Since we're already out here might as well check out Neptune.",
        planetIcon: "neptune.png",
    },
    {
        message: "Look how far you've come! Poor little dwarf planet Pluto on the edge of our solar system.",
        planetIcon: "pluto.png",
    },
    {
        message: "Wow! You're too good for this solar system. Can you do it one more time?",
        planetIcon: "milky-way.png",
    },
    {
        message: "Congratulations, Space Explorer!<br>You're the aliens' problem now.",
        planetIcon: "astronaut1.png",
    }
]

// ----------------declaring variables-----------------
var randomTargetNumber = 0;
var randomIconNumber = 0;
var totalScore = 0;
var winCount = 0;
var lossCount = 0;
var currentWinArrayIndex = 1;
var currentLoserArrayIndex = getLoserArrayIndex();;
//- * make the distance between ship and moon that many spaces

// ----------------defining functions-----------------
function assignTargetNumber() {
    //FOR TESTING PURPOSES!
    // randomTargetNumber = Math.floor(Math.random() * 102) + 19;
    randomTargetNumber = Math.floor(Math.random() * 10);
    $("#targetNumber").html(randomTargetNumber);
}

function getRandomIconValue() {
    //FOR TESTING PURPOSES!
    // randomIconNumber = Math.floor(Math.random() * 12) + 1;
    randomIconNumber = Math.floor(Math.random() * 4);
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
    $("#score").html(0);
}

// ----------------playing the game code-----------------

assignTargetNumber();
assignIconValues(getRandomIconValue());
// $("#status").html(winnerArray[currentWinArrayIndex].message);
$("#nextPlanet").attr("src", "assets/images/" + winnerArray[currentWinArrayIndex].planetIcon);
$("#currentPlanet").attr("src", "assets/images/" + winnerArray[currentWinArrayIndex - 1].planetIcon);

$(".btn").on("click", function () {
    totalScore += parseInt($(this).val());
    $("#score").html(totalScore);

    // if their score is <= the targetNumber, keep guessing and adding click numbers to score
    // - * move space ship towards moon same number of space they guessed

    // - * if their score exceeds the targetNumber they lose
    //     - * add to loss count, display loss message, reset the numbers, a meteor shower made them start mission over

    // - * reset game
    if (totalScore === randomTargetNumber) {
        currentWinArrayIndex++;
        console.log(currentWinArrayIndex);
        $("#status").html(winnerArray[currentWinArrayIndex].message);
        $("#nextPlanet").attr("src", "assets/images/" + winnerArray[currentWinArrayIndex].planetIcon);
        $("#currentPlanet").attr("src", "assets/images/" + winnerArray[currentWinArrayIndex - 1].planetIcon);
        $("#statusIcon").attr("src", "");
        winCount++;
        $("#winCount").html(winCount);
        
        var nextPlanetSrc = $("#nextPlanet").attr("src");
        if (nextPlanetSrc === "assets/images/astronaut1.png") {
            $("#currentPlanet").addClass("d-none");

        } else {
            reset();
        }

    } else if (totalScore > randomTargetNumber) {
        //display random loser message & icon, go back one planet, add to losses, reset
        if (currentWinArrayIndex > 1) {
            currentWinArrayIndex--;
        }
        getLoserArrayIndex();
        console.log(currentWinArrayIndex);
        $("#status").html(loserArray[currentLoserArrayIndex].message);
        $("#statusIcon").attr("src", "assets/images/" + loserArray[currentLoserArrayIndex].icon);
        $("#nextPlanet").attr("src", "assets/images/" + winnerArray[currentWinArrayIndex].planetIcon);
        $("#currentPlanet").attr("src", "assets/images/" + winnerArray[currentWinArrayIndex - 1].planetIcon);
        lossCount++;
        $("#lossCount").html(lossCount);

        
        reset();
    }
})








