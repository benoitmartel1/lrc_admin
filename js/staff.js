$(function () {
  staff.forEach(item => {
    $(".list").append(`
				<li id="${item.id}">
				<div class="nom">${item.nom.toUpperCase()}</div>
				<div class="prenom">${item.prenom}</div>
				</li>
				`);
  });

  //-- When you click on li item, the div with details info toggles.
  $("li").click(e => {});

  var options = {
    valueNames: ["nom", "prenom"]
  };
  var staffList = new List("staff", options);
});
