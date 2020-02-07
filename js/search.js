$(document).ready(function() {
  $("#ageFilter a").click(function(e) {
    console.log("clicked");
    alert($(this).text());
  });
  $(programs).each(function() {
    $(this.Activities).each(function() {
      var sDate = new Date(this.StartDate);
      var eDate = new Date(this.EndDate);
      $(".list").append(
        `
				<li>
				<div class="name">${this.Name}</div>
				<div class="price">${this.Price}</div>
				<div class="ageMin">${this.Age.Min}</div>
				<div class="ageMax">${this.Age.Max}</div>
				<div class="startDate">${this.StartDate}</div>
				<div class="day hidden">${sDate.getDay()}</div>
				<div class="hour hidden">${sDate.getHours()}</div>
				<div class="subCategory">${this.SubCategoryName}</div>
				<div class="duration hidden">${eDate.getHours() +
          eDate.getMinutes() / 60 -
          (sDate.getHours() + sDate.getMinutes() / 60)}</div>
				</li>
				`
      );
    });
  });
  var options = {
    valueNames: [
      "name",
      "price",
      "ageMin",
      "ageMax",
      "day",
      "hour",
      "duration",
      "subCategory"
    ]
  };
  var userList = new List("users", options);
});
