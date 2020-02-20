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
    console.log($(e.target).closest("li").attr("id"));
  });

  var options = {
    valueNames: ["nom", "prenom"]
  };
  var staffList = new List("staff", options);
});
