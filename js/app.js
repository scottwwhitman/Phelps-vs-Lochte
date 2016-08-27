console.log("Sanity Check: JS is working!");
// wait for the DOM to finish loading

// define globals


$(document).on("ready", function() {


  function Swimmer() {
      this.name = "Phelps";
      this.id = $("#swimmer1");
      this.image = 50;
      this.position = 100;
  };

  var swimmer1 = new Swimmer();

  var swimmer2 = new Swimmer();
  swimmer2.id = $("#swimmer2");

  setBoard();

  function setBoard() {
    $("#setGame").on("click", function(){
      swimmer1.id.css("visibility", "visible");
      swimmer2.id.css("visibility", "visible");
    });
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
  };





});
