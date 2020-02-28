$(function() {
  var keyDownHandler = function(evt) {
    alert(evt.keyCode);
    if (evt.key === "VolumeDown") {
      // process logic of volume-down
    } else if (evt.keyCode === 175) {
      alert("YEAH!");
    }
    evt.preventDefault(); // to stop system app from processing keydown event
  };

  window.addEventListener("keydown", keyDownHandler);
  staff.forEach(item => {
    $(".list").append(`
				<li id="${item.id}">
				<div class="nom">${item.nom}</div>
				<div class="prenom">${item.prenom}</div>
				<div class="phone">${item.phone}</div>
				</li>
				`);
  });

  //-- When you click on li item, the div with details info toggles.
  $("li").click(e => {
    let id = $(e.target)
      .closest("li")
      .attr("id");
    window.open("edit.php?id=" + id, "_self");
  });

  var options = {
    valueNames: ["nom", "prenom"]
  };
  var staffList = new List("staff", options);
});
