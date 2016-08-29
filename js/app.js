console.log("Sanity Check: JS is working!");
// wait for the DOM to finish loading

$(document).on("ready", function() {

  // Global Variables
  var player1SelectMessage = "Player 1 select your swimmer"
  var player2SelectMessage = "Player 2 select your swimmer"
  var player1StartName = "Player 1"
  var player2StartName = "Player 2"
  var player1Score = 0
  var player2Score = 0
  var swimmer1 = null
  var swimmer2 = null
  var swimmerSelector = 1
  var delay = 2000

  // runs Handlebars to create swimmer list
  var source = $('#swimmer-List-Template').html();
  var swimmerTemplate = Handlebars.compile(source);
  var swimmerHtml = swimmerTemplate({swimmers: swimmerData.swimmers});
  $("#swimmer-List").append(swimmerHtml);

  // sets the initial game
  var game = new Game();

  // sets a new game
  function Game() {
    this.startMessages = new StartMessages();
    this.board = new Board();
  };

  // sets initial game messages
  function StartMessages() {
    $("#gameMessage").text(player1SelectMessage);
    $("#player1Name").text(player1StartName);
    $("#player2Name").text(player2StartName);
    $("#player1Score").text(player1Score);
    $("#player2Score").text(player2Score);
  }

  // race the same swimmers again
  $("#raceAgain").on("click", function () {
    swimmer1.position = 50;
    swimmer2.position = 50;
    swimmer1.id.css("margin-left", "50px");
    swimmer2.id.css("margin-left", "50px");
    $("body").off('keydown');
    $("#gameOnYourMarksBox").css("visibility", "hidden");
    $("#goBox").css("visibility", "hidden");
    $("#gameMessage").text("Press 'Start Race' to begin race countdown!");
    race();
  });


  // resets the game and choose new swimmers
  $("#reset").on("click", function () {
    player1Score = 0
    player2Score = 0
    swimmer1 = null
    swimmer2 = null
    swimmerSelector = 1
    $("#swimmerOne img:last-child").remove();
    $("#swimmerTwo img:last-child").remove();
    $("#swimmerOne").css("visibility", "hidden");
    $("#swimmerOne").css("margin-left", 50);
    $("#swimmerTwo").css("visibility", "hidden");
    $("#swimmerTwo").css("margin-left", 50);
    $("body").off('keydown');
    $("#gameOnYourMarksBox").css("visibility", "hidden");
    $("#goBox").css("visibility", "hidden");
    game = new Game();
  });

  // sets the board with swimmers
  function Board() {
    $(".selectSwimmer").on("click", function() {
      var clickedBox = $(this);
      var swimmerID = $(this).attr('id');
      if (swimmerSelector === 1) {
        swimmer1 = new Swimmer();
        swimmer1.id = $("#swimmerOne");
        swimmer1.id.css("visibility", "visible");
        swimmer1.firstName = swimmerData.swimmers[swimmerID].swimmer_firstName;
        swimmer1.lastName = swimmerData.swimmers[swimmerID].swimmer_lastName;
        swimmer1.image = swimmerData.swimmers[swimmerID].swimmer_image;
        swimmer1.imageID = swimmerData.swimmers[swimmerID].swimmer_imageID;
        swimmer1.imageIDRace = swimmerData.swimmers[swimmerID].swimmer_imageIDRace;
        $('#swimmerOne').prepend('<img id="'+swimmer1.imageIDRace+'" src=" '+ swimmer1.image +' ">');
        console.log(swimmer1);
        clickedBox.off("click");
        $("#player1Name").text(swimmer1.firstName + " " + swimmer1.lastName);
        swimmerSelector = 2;
        $("#gameMessage").text(player2SelectMessage);
      } else {
        swimmer2 = new Swimmer();
        swimmer2.id = $("#swimmerTwo");
        swimmer2.id.css("visibility", "visible");
        swimmer2.firstName = swimmerData.swimmers[swimmerID].swimmer_firstName;
        swimmer2.lastName = swimmerData.swimmers[swimmerID].swimmer_lastName;
        swimmer2.image = swimmerData.swimmers[swimmerID].swimmer_image;
        swimmer2.imageID = swimmerData.swimmers[swimmerID].swimmer_imageID;
        swimmer2.imageIDRace = swimmerData.swimmers[swimmerID].swimmer_imageIDRace;
        $('#swimmerTwo').prepend('<img id= "'+swimmer2.imageIDRace+'" src=" '+ swimmer2.image +' ">');
        console.log(swimmer2);
        clickedBox.off("click");
        $("#player2Name").text(swimmer2.firstName + " " + swimmer2.lastName);
        $(".selectSwimmer").off("click");
        $("#gameMessage").text("Press 'Start Race' to begin race countdown!");
        race();
      }
    });
  }

  // creates a swimmer
  function Swimmer() {
      this.id = null;
      this.firstName = null;
      this.lastName = null;
      this.image = null;
      this.position = 50;
      this.imageID = null;
      this.imageIDRace = null;
  }

  // creates each race provides the movement and checks for a winner
  function race() {
    $("#startGame").on('click', function() {
      $("#gameOnYourMarksBox").css("visibility", "visible");
      setTimeout(function() {
        $("#goBox").css("visibility", "visible");
        $("#gameMessage").text("GO!");
        $("body").on('keydown', function (event) {
          if (event.keyCode === 91) {
            swimmer1.position += 20;
            var swimmer1Position = swimmer1.position + "px";
            swimmer1.id.css("margin-left", swimmer1Position);
          }
          if (event.keyCode === 93) {
            swimmer2.position += 20;
            var swimmer2Position = swimmer2.position + "px";
            swimmer2.id.css("margin-left", swimmer2Position);
          }
          if (swimmer1.position === 790) {
              $("body").off('keydown');
              $("#gameMessage").text(swimmer1.firstName + " " + swimmer1.lastName + " Wins!");
              player1Score += 1;
              $("#player1Score").text(player1Score);
          }
          if (swimmer2.position === 790) {
            $("body").off('keydown');
              $("#gameMessage").text(swimmer2.firstName + " " + swimmer2.lastName + " Wins!");
              player2Score += 1;
              $("#player2Score").text(player2Score);
          }
        });
      }, delay);
    });
  }
// end
});
