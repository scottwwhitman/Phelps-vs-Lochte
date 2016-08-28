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

  setSwimmers();
  // runs Handlebars function to create swimmer list
  function setSwimmers() {
    var source = $('#swimmer-List-Template').html();
    var swimmerTemplate = Handlebars.compile(source);
    var swimmerHtml = swimmerTemplate({swimmers: swimmerData.swimmers});
    $("#swimmer-List").append(swimmerHtml);
  }

  setBoard();

// Function Definitions

  $("#reset").on("click", function () {
    player1Score = 0
    player2Score = 0
    swimmer1 = null
    swimmer2 = null
    swimmerSelector = 1
    $("#swimmerOne").css("visibility", "hidden");
    $("#swimmerOne").css("margin-left", 50);
    $("#swimmerTwo").css("visibility", "hidden");
    $("#swimmerTwo").css("margin-left", 50);
    setBoard();
  });

  function setBoard() {

    // Sets initial game message
    $("#gameMessage").text(player1SelectMessage);

    $("#player1Name").text(player1StartName);

    $("#player2Name").text(player2StartName);

    $("#player1Score").text(player1Score);

    $("#player2Score").text(player2Score);

    // runs Handlebars function to create swimmer list
    // var source = $('#swimmer-List-Template').html();
    // var swimmerTemplate = Handlebars.compile(source);
    // var swimmerHtml = swimmerTemplate({swimmers: swimmerData.swimmers});
    // $("#swimmer-List").append(swimmerHtml);

    $(".selectSwimmer").on("click", function () {
      var clickedBox = $(this);
      var swimmerID = $(this).attr('id');
      createSwimmer();
      function createSwimmer() {
        if (swimmerSelector === 1) {
          swimmer1 = new Swimmer();
          swimmer1.id = $("#swimmerOne");
          swimmer1.id.css("visibility", "visible");
          swimmer1.firstName = swimmerData.swimmers[swimmerID].swimmer_firstName;
          swimmer1.lastName = swimmerData.swimmers[swimmerID].swimmer_lastName;
          swimmer1.image = swimmerData.swimmers[swimmerID].swimmer_image;
          swimmer1.id.text(swimmer1.lastName);
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
          swimmer2.id.text(swimmer2.lastName);
          console.log(swimmer2);
          clickedBox.off("click");
          $("#player2Name").text(swimmer2.firstName + " " + swimmer2.lastName);
          $(".selectSwimmer").off("click");
          $("#startGame").on('click', function() {
              $("body").on('keydown', function (e) {
                  if (e.keyCode === 91) {
                    swimmer1.position += 20;
                    var swimmer1Position = swimmer1.position + "px";
                    console.log(swimmer1Position);
                    swimmer1.id.css("margin-left", swimmer1Position);
                  }
                  if (e.keyCode === 93) {
                    swimmer2.position += 20;
                    var swimmer2Position = swimmer2.position + "px";
                    console.log(swimmer2Position);
                    swimmer2.id.css("margin-left", swimmer2Position);
                  }
                  if (swimmer1.position === 770) {
                      $("body").off('keydown');
                      $("#gameMessage").text(swimmer1.firstName + " " + swimmer1.lastName + " Wins!");
                      player1Score += 1;
                      $("#player1Score").text(player1Score);
                  }
                  if (swimmer2.position === 770) {
                      $("body").off('keydown');
                      $("#gameMessage").text(swimmer2.firstName + " " + swimmer2.lastName + " Wins!");
                      player2Score += 1;
                      $("#player2Score").text(player2Score);
                  }
              });
          });
        }
      }

    });

    //
    // function setGame() {
    //   $("#startGame").on('click', function() {
    //     $("body").on('keydown', function (e) {
    //         if (e.keyCode === 13) {
    //           swimmer1.position += 10;
    //           var swimmer1Position = swimmer1.position + "px";
    //           swimmer1.id.css("margin-left", swimmer1Position);
    //         } else if (e.keyCode === 16) {
    //           swimmer2.position += 10;
    //           var swimmer2Position = swimmer2.position + "px";
    //           swimmer2.id.css("margin-left", swimmer2Position);
    //         }
    //       });
    //   })
    // }
  };

  function Swimmer() {
      this.id = null;
      this.firstName = null;
      this.lastName = null;
      this.image = null;
      this.position = 50;
    }


  // function createSwimmer1() {
  //   swimmer1 = new Swimmer();
  //   swimmer1.id = $("#swimmer1");
  //   swimmer1.id.css("visibility", "visible");
  //   swimmer1.firstName = swimmerData.swimmers[swimmerID].swimmer_firstName;
  //   swimmer1.lastName = swimmerData.swimmers[swimmerID].swimmer_lastName;
  //   swimmer1.image = swimmerData.swimmers[swimmerID].swimmer_image;
  //   swimmer1.id.text(swimmer1.lastName);
  //   }


  // var clickedBox = $(this);
  //
  // if (playerUp === 1) {
  //   var addCardX = $('<img src="x.png" class="box cardX">');
  //   $(clickedBox).append(addCardX);
  // } else {
  //   var addCardO = $('<img src="o.png" class="box cardO">');
  //   $(clickedBox).append(addCardO);
  // };
  //
  //
  //
  // function Swimmer() {
  //     this.name = "Phelps";
  //     this.id = $("#swimmer1");
  //     this.image = 50;
  //     this.position = 50;
  // };
  //
  // var swimmer1 = new Swimmer();



  // var swimmer2 = new Swimmer();
  // swimmer2.id = $("#swimmer2");
  //
  // setBoardOld();
  //
  // function setBoardOld() {
  //   // $("#setGame").on("click", function(){
  //   //   // swimmer1.id.css("visibility", "visible");
  //   //   swimmer2.id.css("visibility", "visible");
  //   // });
  //   $("body").on('keydown', function (e) {
  //       if (e.keyCode === 13) {
  //         swimmer1.position += 10;
  //         var swimmer1Position = swimmer1.position + "px";
  //         swimmer1.id.css("margin-left", swimmer1Position);
  //       } else if (e.keyCode === 16) {
  //         swimmer2.position += 10;
  //         var swimmer2Position = swimmer2.position + "px";
  //         swimmer2.id.css("margin-left", swimmer2Position);
  //       }
  //     });
  // };





});
