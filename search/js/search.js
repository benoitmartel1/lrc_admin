$(document).ready(function() {

	var editMode=true;
	console.log('EditMode='+editMode);
	var sessionsToDisplay = [
    text.sessions.spring,
    // text.sessions.summer,
    text.sessions.fall,
    text.sessions.winter,
    text.sessions.yearly
  ];

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
  categories.sort(sortCategoriesByName);


  
  categories = categories.filter(
    (cat, index, self) =>
      self.findIndex((t) => JSON.stringify(t) === JSON.stringify(cat)) === index
  );

               //--------------------POPULATE-----------------------//
               //Populate the grid
               $(categories).each(function () {
				   var categoryClass = this.class;
                 //Creates always visible header on top of category
                 $(".list").append(createCategoryHeader(this));

                 //Get all activities that have a tag that matches the category
                 var categoryActivities = activities.filter(
                   getActivitiesById,
                   this.id
                 );

                 //Sort those activities
                 categoryActivities.sort(sortByName);

                 //Create the list item for every activity
                 $(categoryActivities).each(function () {
					var sDate = new Date(this.StartDate);
					var eDate = new Date(this.EndDate);
					var staff= formatStaff(this.Staff);
                   if (
					   	//SHow activity Only if part of session displayed
						sessionsToDisplay.includes(formatSession(sDate,eDate))
                   ) {
                     
					var signupText = editMode == true ? text.edit : text.signup;

                     var duration =
                       eDate.getHours() + " h "+
                       (eDate.getMinutes() / 60 -
					   (sDate.getHours() + sDate.getMinutes() / 60))*60+" min";
					   
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
						<li class="activity grid ${categoryClass}" data-id='${this.Id}' data-program-id='${this.ProgramId}'>
							<div class="name">${formatName(this.Name)}${isNew(this.Tags)}</div>
							<div class="age">${formatAge(this.Age)}</div>
							<div class="schedule">${formatSchedule(sDate, eDate)}</div>
							<div class="session">${formatSession(sDate, eDate)}</div>
							<div class="price">${formatPrice(this.Price)}</div>
							<div class="cours">${this.NumberOfOccurrences}</div>
							<div class="location" data-toggle="tooltip" title="${
                this.Location ? this.Location.FullName : ""
              }">${this.Location ? formatLocation(this.Location) : ""}</div>
							<div class="staff">${(staff)?staff.split(" ")[0]:""}</div>
							<div class="start">${formatStartingDate(sDate)}</div>
							<div class="signup">
							${
                this.SpotsRemaining > 0
                  ? "<button type='button' class='btn btn-outline-primary btn-sm'>"+signupText+"</button>"
                  : "<button class='isFull btn btn-light btn-sm' disabled>" +
                    text.full +
                    "</button>"
              }</div>
						<div class="details hidden">
							<div class="grid">
								<div class="thumb" style="background-image:url('${this.PictureUrl}')"></div>
								<div class="infos">
									${formatInfo(this.Description, "description", null)}
									${formatInfo(staff, "responsible", text.infos.responsible)}
									${formatInfo(this.Prerequisite, "prerequisite", text.infos.prerequisite)}
									${formatInfo(this.Note, "note", text.infos.note)}
									${formatInfo(duration, "duration", text.infos.duration)}
								</div>
							</div>
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
							<div class="locationId">${this.Location ? this.Location.Id : null}</div>

						</div>
						</li>
					`
                     );
                   }
                 });
			   });
			   //Activate tooltips 
			     $('[data-toggle="tooltip"]').tooltip();



			   //Fill in text divs
               $("[id*='text-']").each(function () {
         //Return the text for the div according to its id text-*name
		 var name = $(this).attr("id");
                                                $(this).text(
                                                         text[
                                                           name.split("-")[1]
                                                         ]
                                                       );
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
                     text: text.daysOfWeek[a],
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
				//    console.log(locations[a].TopParentId);
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
				$(".signup button:not(.isFull)").click(function (e) {
					e.stopPropagation();
					var id=$(this).closest('li').attr('data-id');
					var programId = $(this).closest("li").attr("data-program-id");

                if (!editMode){

				 window.open('https://www.amilia.com/store/en/loisirsrenaudcoursol/shop/activities/' +
                    id +
                    '?quickRegisterId=' +
					id, '_blank');
				}else{
					window.open(
            "https://www.amilia.com/Activities/fr/loisirsrenaudcoursol/Edit/" +
              programId +
              "?activityId=" +
              id,
            "_blank"
          );
				};
               });

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
				   var target=$(e.target).closest('.activity');
				if (!$(target).find('.details').is(':visible')){
			
               		//Hide other details opened if any
              		 $(".details").hide();
            	 };
					togglePopUp($(target).find(".details"));  
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
					 //If still in list, check next filter
                   if (filters.location && inList)
                     inList = filterLocation(item, parseInt(filters.location));
                   return inList;
                 });
               }
               //Attach filter label
               function addFilterLabel(label) {
				 var type = $(label).attr("data-type");
				 var suffix =(type == "age") ? ' '+text.yearsOld : "";
				var labelText = $(label).text()+suffix;
                 var value = $(label).attr("data-value");
                 $(".applied-filters").append(
                   $("<span>", {
                     text: labelText,
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
			   function filterLocation(item, id) {
          			 return item.values().locationId == id ? true : false;
        		 }
               function togglePopUp(target) {
                 $(target).slideToggle(250, function(){
				 });
                 //$(".black").fadeToggle(100);
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
				   "locationId"
                 ],
               };
               var userList = new List("app", options);
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
