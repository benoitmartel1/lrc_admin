$(function() {
  staff.forEach(item => {
    $(".list").append(`
				<li id="${item.id}">
				<div class="nom">${item.name}</div>
				<div class="prenom">${item.surname}</div>
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
