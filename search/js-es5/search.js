"use strict";

//Display parameters received from db search_params configured through manager.php
var searchParams = params;
var editMode = false; //If true, signup button becomes a link to Amilia activity edit

var isOpenForRegistration = true; //If false, signup button alerts message instead of redirect
//Check if printable mode has been set, if not, set it to false for display mode

var printable = typeof printable !== "undefined" ? printable : false; // let gridCssTemplateColumns = "";
// let gridCssTemplateAreas = ['"', ""];

var sortCategoriesByName;
var columnsToHide = searchParams.columns.filter(function (c) {
  if (printable == true) {
    return c.visiblePrint == false;
  } else {
    return c.visible == false;
  }
}); //======Prepare Columns to display in activities grid
//Keep only visible columns

searchParams.columns = searchParams.columns.filter(function (c) {
  return printable == true ? c.visiblePrint == true : c.visible == true;
}); // //Order columns by their rank
// searchParams.columns.sort(function (a, b) {
//   return a.rank - b.rank;
// });
//==========================================

var visiblePrograms = searchParams.programs.filter(function (a) {
  if (printable == true) {
    return a.visiblePrint == true;
  } else {
    return a.visible == true;
  }
}).map(function (a) {
  return a.id;
});
var filtersToHide = searchParams.filters.filter(function (a) {
  if (printable == true) {
    return a.visiblePrint == false;
  } else {
    return a.visible == false;
  }
});
$(document).ready(function () {
  $("#scroll_up").click(function (e) {
    e.preventDefault();
    document.body.scrollTop = 0; // For Safari

    document.documentElement.scrollTop = 0; // For Chrome, Firefo
  }); //Get all activities/locations to populate page

  $.get("php/activities.php", {
    visiblePrograms: visiblePrograms
  }, function (data) {
    $(".loading").slideUp();
    $(".filters").fadeIn(); // console.log(text);

    fillGrid(JSON.parse(data), text); //Hide unwanted filters as defined in searchParams.filters

    filtersToHide.forEach(function (filter) {
      $("[data='" + filter.type + "']").hide();
    }); //Hide unwanted columns as defined in searchParams.filters

    columnsToHide.forEach(function (filter) {
      $("." + filter.type).hide();
    });
  }); //Fill in text divs

  $("[id*='text-']").each(function () {
    //Return the text for the div according to its id text-*name
    var name = $(this).attr("id");
    $(this).text(text[name.split("-")[1]]);
  });
});

function fillGrid(data, text) {
  var activities = data.allActivities;
  var locations = data.locations; // If true, signup button becomes Edit and redirects to edit page in Amilia
  //If false, signup button redirects to subscribe page in Amilia

  var sessionsToDisplay = [text.sessions.spring, text.sessions.summer, text.sessions.fall, text.sessions.winter, text.sessions.yearly];
  var categories = activities.map(function (n) {
    var cat = {};
    cat.name = n.CategoryName;
    cat.class = convertToClassSafe(n.CategoryName);
    cat.id = n.CategoryId;
    return cat;
  }); //Alpha sort

  categories.sort(sortCategoriesByName); //Remove duplicates

  categories = getUniqueArray(categories); //   categories = categories.filter(
  //     (cat, index, self) =>
  //       self.findIndex((t) => JSON.stringify(t) === JSON.stringify(cat)) === index
  //   );
  //--------------------POPULATE-----------------------//
  //Populate the grid

  $(categories).each(function () {
    var categoryClass = this.class; //Creates always visible header on top of category

    $(".list").append(createCategoryHeader(this)); //Get all activities that have a tag that matches the category

    var categoryActivities = activities.filter(getActivitiesById, this.id); //Sort those activities 1

    categoryActivities.sort(sortByName); //Create the list item for every activity

    $(categoryActivities).each(function () {
      this.Name = formatName(this.Name); // var sDate = new Date(this.StartDate);
      // var eDate = new Date(this.EndDate);
      // console.log(sDate);

      moment.locale("fr");
      var sDate = moment.parseZone(this.StartDate);
      var eDate = moment.parseZone(this.EndDate); // console.log(mDate);

      var staff = formatStaff(this.Staff);

      if ( //SHow activity Only if part of session displayed
      sessionsToDisplay.indexOf(formatSession(sDate, eDate)) > -1) {
        var signupText = editMode == true ? text.edit : text.signup;
        var dur = eDate.hours() + eDate.minutes() / 60 - (sDate.hours() + sDate.minutes() / 60);
        var duration = dur >= 1 ? Math.floor(dur) + " h " : "";
        duration += dur % 1 > 0 ? dur % 1 * 60 + " min" : "";
        var keywords = "";

        for (var i in this.Keywords) {
          keywords += this.Keywords[i] + " ";
        }

        var tags = "";

        for (var i in this.Tags) {
          tags += this.Tags[i].Name + " ";
        }

        $(".list").append("<li class=\"activity grid ".concat(categoryClass, "\" data-id='").concat(this.Id, "' data-program-id='").concat(this.ProgramId, "'>\n\t\t\t\t\t\t\t<div class=\"name\">").concat(this.Name).concat(isNew(this.Tags), "</div>\n\t\t\t\t\t\t\t<div class=\"info\" data-toggle=\"tooltip\" title=\"").concat(text.info, "\"><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i></div>\n\t\t\t\t\t\t\t<div class=\"age\">").concat(formatAge(this.Age), "</div>\n\t\t\t\t\t\t\t<div class=\"schedule\">").concat(formatSchedule(sDate, eDate), "</div>\n\t\t\t\t\t\t\t<div class=\"session\">").concat(formatSession(sDate, eDate), "</div>\n\t\t\t\t\t\t\t<div class=\"price\">").concat(formatPrice(this.Price), "</div>\n\t\t\t\t\t\t\t<div class=\"cours\">").concat(this.NumberOfOccurrences < 52 ? this.NumberOfOccurrences : "", "</div>\n\t\t\t\t\t\t\t<div class=\"location\" data-toggle=\"tooltip\" title=\"").concat(this.Location ? this.Location.FullName : "", "\">").concat(this.Location ? formatLocation(this.Location) : "", "</div>\n\t\t\t\t\t\t\t<div class=\"staff\">").concat(staff ? staff.split(" ")[0] : "", "</div>\n\t\t\t\t\t\t\t<div class=\"start\">").concat(formatStartingDate(sDate), "</div>\n\t\t\t\t\t\t\t<div class=\"spacer\"></div>\n\t\t\t\t\t\t\t<div class=\"signup\">\n\t\t\t\t\t\t\t").concat(this.SpotsRemaining == 0 ? "<button class='isFull btn btn-light btn-sm'>" + text.full + "</button>" : "<button type='button' class='btn btn-success btn-sm'>" + signupText + "</button>", "</div>\n\t\t\t\t\t\t<div class=\"details hidden\">\n\t\t\t\t\t\t\t<div class=\"grid\">\n\t\t\t\t\t\t\t\t<div class=\"thumb\" style=\"background-image:url('").concat(this.PictureUrl, "')\"></div>\n\t\t\t\t\t\t\t\t<div class=\"summary\">\n\t\t\t  \t\t\t\t\t\t").concat(formatInfo(formatLiteralSchedule(sDate, eDate), "literalSchedule", '<i class="far fa-clock"></i>'), "\n\t\t\t  \t\t\t\t\t\t").concat(formatInfo(formatSpan(sDate, eDate), "span", '<i class="far fa-calendar-alt"></i>'), "\n\t\t\t\t\t\t\t\t\t").concat(this.Location ? formatInfo(this.Location.FullName, "fullLocation", '<i class="fas fa-map-marker-alt"></i>') : "", "\n\t\t\t\t\t\t\t\t\t").concat(formatInfo(staff, "responsible", '<i class="fas fa-user"></i>'), "\n\t\t\t\t\t\t\t\t\t").concat(formatInfo(duration, "duration", text.infos.duration), "\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"infos\">\n\t\t\t\t\t\t\t\t\t").concat(formatInfo(this.Description, "description", text.infos.description), "\n\t\t\t\t\t\t\t\t\t").concat(formatInfo(this.Prerequisite, "prerequisite", text.infos.prerequisite), "\n\t\t\t\t\t\t\t\t\t").concat(formatInfo(this.Note, "note", text.infos.note), "\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"hidden\">\n\t\t\t\t\t\t\t<div class=\"id\">").concat(this.Id, "</div>\n\t\t\t\t\t\t\t<div class=\"day\">").concat(sDate.day(), "</div>\n\t\t\t\t\t\t\t<div class=\"ageMin\">").concat(this.Age ? this.Age.Months ? Math.floor(this.Age.Min / 12) : this.Age.Min : 0, "</div>\n\t\t\t\t\t\t\t<div class=\"ageMax\">").concat(this.Age ? this.Age.Months ? Math.ceil(this.Age.Max / 12) : this.Age.Max : 99, "</div>\n\t\t\t\t\t\t\t<div class=\"keywords\">").concat(keywords + tags, "</div>\n\t\t\t\t\t\t\t<div class=\"startDate\">").concat(this.StartDate, "</div>\n\t\t\t\t\t\t\t<div class=\"hour\">").concat(sDate.hour(), "</div>\n\t\t\t\t\t\t\t<div class=\"duration\">").concat(duration, "</div>\n\t\t\t\t\t\t\t<div class=\"category\">").concat(categoryClass, "</div>\n\t\t\t\t\t\t\t<div class=\"locationId\">").concat(this.Location ? this.Location.Id : null, "</div>\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t"));
      }
    });
  }); //Clean empty paragraphs

  $("p").each(function () {
    if ($.trim($(this).text()) == "" || $.trim($(this).text()) == "&nbsp;" || $.trim($(this).text()) == "<br>") {
      $(this).remove();
    }
  }); //Populate age filter menu

  for (var a = 18; a >= 0; a--) {
    $("#age-drop").append($("<option>", {
      text: a < 18 ? a : "Adulte",
      class: "dropdown-item"
    }).attr("data-type", "age").attr("data-value", a));
  } //Populate day filter menu


  for (var a = 0; a < 7; a++) {
    $("#day-drop").append($("<option>", {
      text: text.daysOfWeek[a],
      class: "dropdown-item"
    }).attr("data-type", "day").attr("data-value", a));
  } //Populate category filter menu


  $(categories).each(function (c) {
    $("#category-drop").append($("<option>", {
      text: this.name,
      class: "dropdown-item"
    }).attr("data-type", "category").attr("data-value", this.class));
  }); //Sort locations according to Name

  locations.sort(function (a, b) {
    //Remove accents and compare
    var textA = a.FullName.latinize().replace(/[\u0300-\u036f]/g, "");
    var textB = b.FullName.latinize().replace(/[\u0300-\u036f]/g, "");
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  }); //Populate location filter menu

  for (var a = 0; a < locations.length; a++) {
    //    console.log(locations[a].TopParentId);
    if (locations[a].TopParentId == null) {
      $("#location-drop").append($("<option>", {
        text: locations[a].FullName,
        class: "dropdown-item"
      }).attr("data-type", "location").attr("data-value", locations[a].Id));
    }
  } //--------------------LISTENERS-----------------------//


  $("select").change(function () {
    var opt = $(this).find("option:selected");
    var type = $(opt).attr("data-type");
    $('.applied-filters .filter[data-type="' + type + '"]').remove();
    addFilterLabel(opt);
    filterResults();
    $(this).find("option:eq(0)").prop("selected", true);
    $("select").blur();
  }); // When the user scrolls the page, execute myFunction

  window.onscroll = function () {
    myFunction();
  };

  var header = $("#app .header"); // Get the offset position of the navbar

  var sticky = $(header).offset().top; // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position

  function myFunction() {
    if (window.pageYOffset > sticky) {
      $(header).addClass("sticky");
    } else {
      $(header).removeClass("sticky");
    }
  } //Signup button


  $(".signup button").click(function (e) {
    e.stopPropagation();
    var isFull = $(this).hasClass("isFull"); // console.log(isFull);

    var id = $(this).closest("li").attr("data-id");
    var programId = $(this).closest("li").attr("data-program-id");

    if (!editMode) {
      //Tracker
      sendTrackerInfo("signup", id);

      if (isOpenForRegistration) {
        if (isFull) {
          window.open("https://www.amilia.com/store/fr/loisirsrenaudcoursol/shop/waitlist/Index/" + id, "_blank");
        } else {
          window.open("https://www.amilia.com/store/fr/loisirsrenaudcoursol/shop/activities/" + id + "?quickRegisterId=" + id, "_blank");
        }
      } else {
        alert("Inscriptions dès le 15 septembre 2020.");
      }
    } else {
      window.open("https://www.amilia.com/Activities/fr/loisirsrenaudcoursol/Edit/" + programId + "?activityId=" + id, "_blank");
    }
  }); //Erase Search input

  $(".erase").click(function () {
    $(".search").val("");
    userList.search("");
  }); //Filter is selected from dropdown

  $(".filter-drop a, .filter-drop option").click(function () {
    var type = $(this).attr("data-type");
    $('.applied-filters .filter[data-type="' + type + '"]').remove();
    addFilterLabel(this);
    filterResults();
  }); //Remove Filter Label

  $("body").on("click", ".applied-filters .filter", function () {
    $(this).remove();
    filterResults();
  }); //Activity li click

  $("li.activity").click(function (e) {
    var target = $(e.target).closest(".activity"); //Check if the click is to open the activity

    if (!$(target).find(".details").is(":visible")) {
      //Tracker
      sendTrackerInfo("activity", $(target).attr("data-id")); //Hide other details opened if any

      $(".details").hide();
    } //Align clicked item top top of page


    $("html, body").animate({
      scrollTop: $(target).offset().top - ($(".header").position().top + $(".header").outerHeight(true))
    }, "fast"); //Open details drawer

    togglePopUp($(target).find(".details"));
  }); //--------------------FUNCTIONS-----------------------//
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
      if (filters.age) inList = filterAge(item, parseInt(filters.age[0])); //If still in list, check next filter

      if (filters.day && inList) inList = filterDay(item, parseInt(filters.day)); //If still in list, check next filter

      if (filters.location && inList) inList = filterLocation(item, parseInt(filters.location));
      if (filters.category && inList) inList = filterCategory(item, filters.category);
      return inList;
    });
  } //Attach filter label


  function addFilterLabel(label) {
    var type = $(label).attr("data-type");
    var suffix = type == "age" ? " " + text.yearsOld : "";
    var labelText = $(label).text() + suffix;
    var value = $(label).attr("data-value"); //Tracker

    sendTrackerInfo("f-" + type, value);
    $(".applied-filters").append($("<span>", {
      text: labelText,
      class: "filter"
    }).attr("data-type", type).attr("data-value", value).append($("<span>", {
      text: "X",
      class: "filter-remove"
    })));
  }

  function filterAge(item, age) {
    var minCheck = item.values().ageMin <= age ? true : false;
    var maxCheck = item.values().ageMax > age || item.values().ageMax == "null" ? true : false;

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

  function filterCategory(item, cat) {
    return item.values().category == cat ? true : false;
  }

  function togglePopUp(target) {
    var imgSrc = $(target).find(".thumb").css("background-image").replace(/^url\(['"](.+)['"]\)/, "$1");
    $(target).find(".grid>div").css("opacity", 0);
    $(target).slideToggle(250, function () {
      $("<img/>").attr("src", imgSrc).on("load", function () {
        $(target).find(".grid>div").each(function (index) {
          // console.log(this);
          $(this).delay(100 * index).animate({
            opacity: 1
          }, 300);
        });
      });
    });
  }

  var options = {
    valueNames: ["id", "name", "price", "ageMin", "ageMax", "day", "hour", "duration", "category", "keywords", "locationId", "session"]
  };
  var userList = new List("app", options);
  userList.on("updated", function (list) {
    //Even if no result, listjs counts the categories header as showing. So if results are not greater than categories used, display no result message
    if (parseInt(list.matchingItems.length) > categories.length) {
      $(".noResult").hide();
    } else {
      $(".noResult").show();
    } //If no result in given category, hide the header


    $(categories).each(function () {
      var header = $(".category-header." + this.class);

      if (!$(".activity." + this.class).length) {
        $(header).hide();
      } else {
        $(header).show();
      }
    });
    window.scrollTo(0, 0);
  }); //Activate tooltips

  $('[data-toggle="tooltip"]').tooltip({
    placement: "top",
    offset: 0
  });
}