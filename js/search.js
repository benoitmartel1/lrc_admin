$(document).ready(function() {
  $("#ageFilter a").click(function() {
    var targetedAge = parseInt($(this).attr("data"));
    console.log(targetedAge);
    userList.filter(function(item) {
      var minCheck = item.values().ageMin <= targetedAge ? true : false;
      var maxCheck =
        item.values().ageMax == null || item.values().ageMax > targetedAge
          ? true
          : false;
      console.log(item.values().ageMin + " : " + item.values().ageMax);
      console.log(minCheck + " : " + maxCheck);
      console.log("\n");
      if (minCheck && maxCheck) {
        return true;
      } else {
        return false;
      }
    });
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
