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
				<li class="container">
				<div class="row main">
					<div class="name col-12 col-md-5">${this.Name}</div>
					<div class="price">${this.Price}<span> $</span></div>
					<div class="age">${this.Age.Min + " à " + this.Age.Max + " ans"}</div>
					${
            this.SpotsRemaining > 0
              ? "<a class='signup' target='_blank' href='https://www.amilia.com/store/en/loisirsrenaudcoursol/shop/activities/" +
                this.Id +
                "?quickRegisterId=" +
                this.Id +
                "'>S'inscrire</a>"
              : "<div class='isFull'>FULL</div>"
          }
					<div class="day">${daysOfWeek[sDate.getDay()]}</div>
				</div>
				<div class="row details">
					<div class="description">${this.Description}</div>
					<div class="prerequisite">${this.Prerequisite}</div>
					<div class="note">${this.Note}</div>
					<div class="hour">${sDate.getHours()}</div>
					<div class="duration">${duration}</div>
					<div class="subCategory">${this.SubCategoryName}</div>
				</div>
				<div class="row hidden">
					<div class="thumb">${this.PictureUrl}</div>
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
  $("li").click(e => {
    var target = $(e.target).closest("li");
    if ($(target).find("img").length == 0) {
      var pictureUrl = $(target)
        .find(".thumb")
        .text();
      $(".details", target).prepend("<img src=" + pictureUrl + ">");
    }
    $(target).toggleClass("active");
    $(".details", target).slideToggle("fast");
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
