$(document).ready(function() {
	console.log(activities);

	categories = [
    ...new Set(
      activities.map((n) => {
        var cat = {};
		cat.name = n.CategoryName;
		cat.class= convertToClassSafe(n.CategoryName);
        cat.id = n.CategoryId;
        return cat;
      })
    ),
  ];


  
  categories = categories.filter(
    (cat, index, self) =>
      self.findIndex((t) => JSON.stringify(t) === JSON.stringify(cat)) === index
  );

               //--------------------POPULATE-----------------------//
               //Populate the grid
               $(categories).each(function () {
				   var categoryClass = this.class;
                 //Creates always visible header on top of category
                 $(".list").append(createCategoryHeader(this, columnHeaders));

                 //Get all activities that have a tag that matches the category
                 var categoryActivities = activities.filter(
                   getActivitiesById,
                   this.id
                 );

                 //Sort those activities
                 categoryActivities.sort(sortByName);

                 //Create the list item for every activity
                 $(categoryActivities).each(function () {
					 console.log(this);
                   if (
                     !this.Name.toLowerCase().includes("hiver") &&
                     !this.Name.toLowerCase().includes("printemps")
                   ) {
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
                     var tags = "";
                     for (var i in this.Tags) {
                       tags += this.Tags[i].Name + " ";
                     }
                     $(".list").append(
                       `
						<li class="activity grid ${categoryClass}">
							<span class="name">${formatName(this.Name)}<span class="label ${isNew(
                         this.Tags
                       )}">${text.new}</span></span>
							<span class="age">${formatAge(this.Age)}</span>
							<span class="schedule">${formatSchedule(sDate, eDate)}</span>
							<span class="price">${formatPrice(this.Price)}</span>
							<span class="cours">${this.NumberOfOccurrences}</span>
							<span class="location">${(this.Location)?formatLocation(this.Location):""}</span>
							<span class="staff">${formatStaff(this.Staff)}</span>
							<span class="start">${formatStartingDate(sDate)}</span>
							${
                this.SpotsRemaining > 0
                  ? "<a class='signup' target='_blank' href='https://www.amilia.com/store/en/loisirsrenaudcoursol/shop/activities/" +
                    this.Id +
                    "?quickRegisterId=" +
                    this.Id +
                    "'>S'inscrire</a>"
                  : "<div class='isFull'>" + text.full + "</div>"
              }
						<div class="details">
			  				<span class="close">X</span>
							<h1>${formatName(this.Name)}</h1>
							<div class="thumb" style="background-image:url('${this.PictureUrl}')"/>
							<div class="description">${this.Description}</div>
							<div class="prerequisite">${this.Prerequisite}</div>
							<div class="note">${this.Note}</div>
							<div class="hour">${sDate.getHours()}</div>
							<div class="duration">${duration}</div>
							<div class="subCategory">${this.SubCategoryName}</div>
						</div>
						<div class="hidden">
							<div class="id">${this.Id}</div>
							<div class="day">${sDate.getDay()}</div>
							<div class="ageMin">${this.Age ? this.Age.Min : 0}</div>
							<div class="ageMax">${this.Age ? this.Age.Max : 99}</div>
							<div class="keywords">${keywords + tags}</div>
							<div class="startDate">${this.StartDate}</div>
							<div class="hour">${sDate.getHours()}</div>
							<div class="duration">${duration}</div>
							<div class="subCategory">${this.SubCategoryName}</div>
							<div class="location-id">${this.Location?this.Location.Id:null}</div>

						</div>
						</li>
					`
                     );
                   }
                 });
               });
               //Fill in text divs
               $("[id*='text-']").each(function () {
                 placeTextInDiv(this);
               });
               //Populate age filter menu
               for (a = 17; a > 0; a--) {
                 $("#age-drop .dropdown-menu").append(
                   $("<a>", {
                     text: a,
                     class: "dropdown-item",
                   })
                     .attr("data-type", "age")
                     .attr("data-value", a)
                 );
               }
               //Populate day filter menu
               for (a = 0; a <= 7; a++) {
                 $("#day-drop .dropdown-menu").append(
                   $("<a>", {
                     text: daysOfWeek[a],
                     class: "dropdown-item",
                   })
                     .attr("data-type", "day")
                     .attr("data-value", a)
                 );
               }

               //Sort locations according to Name
               locations.sort(function (a, b) {
                 //Remove accents and compare
                 var textA = a.FullName.normalize("NFD").replace(
                   /[\u0300-\u036f]/g,
                   ""
                 );
                 var textB = b.FullName.normalize("NFD").replace(
                   /[\u0300-\u036f]/g,
                   ""
                 );
                 return textA < textB ? -1 : textA > textB ? 1 : 0;
               });

               //Populate location filter menu
               for (a = 0; a < locations.length; a++) {
				   console.log(locations[a].TopParentId);
				   if(locations[a].TopParentId==null){
						$("#location-drop .dropdown-menu").append(
						$("<a>", {
							text: locations[a].FullName,
							class: "dropdown-item",
						})
							.attr("data-type", "location")
							.attr("data-value", locations[a].Id)
						);
				   }
               }
               //--------------------LISTENERS-----------------------//
               //Erase Search input
               $(".erase").click(function () {
                 $(".search").val("");
                 userList.search("");
               });
               //Filter is selected from dropdown
               $(".filter-drop a").click(function () {
                 var type = $(this).attr("data-type");
                 $(
                   '.applied-filters .filter[data-type="' + type + '"]'
                 ).remove();
                 addFilterLabel(this);
                 filterResults();
               });
               //Remove Filter Label
               $("body").on("click", ".applied-filters .filter", function () {
                 $(this).remove();
                 filterResults();
               });
               //Toggle the popup details/info of activity.
               $("li.activity").click((e) => {
                 var target = $(e.target).closest("li");
                 togglePopUp($(target).find(".details"));
               });
               //Close the popup
               $(".close, .black").click((e) => {
                 e.stopPropagation();
                 togglePopUp($(".details:visible"));
               });

               //--------------------FUNCTIONS-----------------------//
               //Apply filters to search
               function filterResults() {
                 var filters = {};
                 $(".applied-filters .filter").each(function () {
                   var type = $(this).attr("data-type");
                   var value = $(this).attr("data-value");
                   if (!filters[type]) {
                     filters[type] = [value];
                   } else {
                     filters[type] += value;
                   }
                 });
                 userList.filter();
                 userList.filter(function (item) {
                   var inList = true;
                   if (filters.age)
                     inList = filterAge(item, parseInt(filters.age[0]));
                   //If still in list, check next filter
                   if (filters.day && inList)
                     inList = filterDay(item, parseInt(filters.day));
                   return inList;
                 });
               }
               //Attach filter label
               function addFilterLabel(label) {
                 var text = $(label).text();
                 var type = $(label).attr("data-type");
                 var value = $(label).attr("data-value");
                 $(".applied-filters").append(
                   $("<span>", {
                     text: text,
                     class: "filter",
                   })
                     .attr("data-type", type)
                     .attr("data-value", value)
                     .append($("<span>", { text: "X", class: "filter-remove" }))
                 );
               }
               function filterAge(item, age) {
                 var minCheck = item.values().ageMin <= age ? true : false;
                 var maxCheck =
                   item.values().ageMax > age || item.values().ageMax == "null"
                     ? true
                     : false;

                 if (minCheck && maxCheck) {
                   return true;
                 } else {
                   return false;
                 }
               }
               function filterDay(item, day) {
                 return item.values().day == day ? true : false;
               }
               function togglePopUp(target) {
                 $(target).fadeToggle(100);
                 $(".black").fadeToggle(100);
               }

               var options = {
                 valueNames: [
                   "id",
                   "name",
                   "price",
                   "ageMin",
                   "ageMax",
                   "day",
                   "hour",
                   "duration",
                   "subCategory",
				   "keywords",
				   "location-id"
                 ],
               };
               var userList = new List("users", options);
               userList.on("updated", function (list) {
                 //Even if no result, listjs counts the categories header as showing. So if results are not greater than categories used, display no result message
                 if (parseInt(list.matchingItems.length) > categories.length) {
                   $(".noResult").hide();
                 } else {
                   console.log("showing");
                   $(".noResult").show();
                 }
                 //If no result in given category, hide the header
                 $(categories).each(function () {
                   var header = $(".category-header." + this.class);
                   if (!$(".activity." + this.class).length) {
                     $(header).hide();
                   } else {
                     $(header).show();
                   }
                 });
               });
             });
