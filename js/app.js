console.log("Sanity Check: JS is working!");
// wait for the DOM to finish loading

$(document).on("ready", function() {

// Global Variables

  var player1SelectMessage = "Player 1 select your swimmer"
  var player2SelectMessage = "Player 2 select your swimmer"
  var player1StartName = "Player 1"
  var player2StartName = "Player 2"
  var player1StartScore = 0
  var player2StartScore = 0
  // var swimmer1 = null
  // var swimmer2 = null
  var swimmerSelector = 1


  setBoard();

// Function Definitions

  $("#reset").on("click", function () {
    setBoard();
  });

  function setBoard() {
    var swimmerSelector = 1

    // Sets initial game message
    $("#gameMessage").text(player1SelectMessage);

    $("#player1Name").text(player1StartName);

    $("#player2Name").text(player2StartName);

    $("#player1Score").text(player1StartScore);

    $("#player2Score").text(player2StartScore);

    // runs Handlebars function to create swimmer list
    var source = $('#swimmer-List-Template').html();
    var swimmerTemplate = Handlebars.compile(source);
    var swimmerHtml = swimmerTemplate({swimmers: swimmerData.swimmers});
    $("#swimmer-List").append(swimmerHtml);



    $(".selectSwimmer").on("click", function () {
      var clickedBox = $(this);
      var swimmerID = $(this).attr('id');
      createSwimmer();
      function createSwimmer() {
        if (swimmerSelector === 1) {
          var swimmer1 = new Swimmer();
          swimmer1.id = $("#swimmerOne");
          swimmer1.id.css("visibility", "visible");
          swimmer1.firstName = swimmerData.swimmers[swimmerID].swimmer_firstName;
          swimmer1.lastName = swimmerData.swimmers[swimmerID].swimmer_lastName;
          swimmer1.image = swimmerData.swimmers[swimmerID].swimmer_image;
          swimmer1.id.text(swimmer1.lastName);
          console.log(swimmer1);
          clickedBox.off("click");
          swimmerSelector = 2;
        } else {
          var swimmer2 = new Swimmer();
          swimmer2.id = $("#swimmerTwo");
          swimmer2.id.css("visibility", "visible");
          swimmer2.firstName = swimmerData.swimmers[swimmerID].swimmer_firstName;
          swimmer2.lastName = swimmerData.swimmers[swimmerID].swimmer_lastName;
          swimmer2.image = swimmerData.swimmers[swimmerID].swimmer_image;
          swimmer2.id.text(swimmer2.lastName);
          console.log(swimmer2);
          clickedBox.off("click");
          swimmerSelector = 2;
          $(".selectSwimmer").off("click");
          setGame();
        }
      }

    });


    function setGame() {
      $("#startGame").on('click', function() {
        $("body").on('keydown', function (e) {
            if (e.keyCode === 13) {
              swimmer1.position += 10;
              var swimmer1Position = swimmer1.position + "px";
              swimmer1.id.css("margin-left", swimmer1Position);
            } else if (e.keyCode === 16) {
              swimmer2.position += 10;
              var swimmer2Position = swimmer2.position + "px";
              swimmer2.id.css("margin-left", swimmer2Position);
            }
          });
      })
    }
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
