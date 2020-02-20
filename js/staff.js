$(function () {
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
    let id = $(e.target).closest("li").attr("id");
    window.open("../edit/index.php?id=" + id);
  });

  var options = {
    valueNames: ["nom", "prenom"]
  };
  var staffList = new List("staff", options);
});