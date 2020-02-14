$(function() {
  $("#ageFilter a").click(function() {
    var targetedAge = parseInt($(this).attr("data"));

    userList.filter(function(item) {
      var minCheck = item.values().ageMin <= targetedAge ? true : false;
      var maxCheck =
        item.values().ageMax > targetedAge || item.values().ageMax == "null"
          ? true
          : false;

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
      var duration =
        eDate.getHours() +
        eDate.getMinutes() / 60 -
        (sDate.getHours() + sDate.getMinutes() / 60);
      var keywords = "";
      for (var i in this.Keywords) {
        keywords += this.Keywords[i] + " ";
      }

      $(".list").append(
        `
				<li>
				<div class="main">
					<div class="name">${this.Name}</div>
					<div class="price">${this.Price}<span> $</span></div>
					<div class="age">${this.AgeSummary}</div>
					${
            this.SpotsRemaining > 0
              ? "<button class='signup'>S'inscrire</button>"
              : "<div class='isFull'>FULL</div>"
          }
					<div class="day">${daysOfWeek[sDate.getDay()]}</div>
				</div>
				<div class="details">
					<div class="description">${this.Description}</div>
					<div class="prerequisite">${this.Prerequisite}</div>
					<div class="note">${this.Note}</div>
					<div class="hour">${sDate.getHours()}</div>
					<div class="duration">${duration}</div>
					<div class="subCategory">${this.SubCategoryName}</div>
				</div>
				<div class="hidden">
					<div class="keywords">${keywords}</div>
					<div class="ageMin">${this.Age.Min}</div>
					<div class="ageMax">${this.Age.Max}</div>
					<div class="startDate">${this.StartDate}</div>
					<div class="hour">${sDate.getHours()}</div>
					<div class="duration">${duration}</div>
					<div class="subCategory">${this.SubCategoryName}</div>
				</div>


	

				</li>
				`
      );
    });
  });

  //-- When you click on li item, the div with details info toggles.
  $("li").click(() => {
    $(this)
      .find(".details")
      .slideToggle("fast");
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
      "subCategory",
      "keywords"
    ]
  };
  var userList = new List("users", options);
});
