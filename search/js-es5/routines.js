"use strict";

function isNew(tags) {
  var label = '';

  if (tags) {
    $(tags).each(function () {
      if (this.Name.toLowerCase() == "nouveau") {
        label = '<span class="label">' + text["new"] + '</span>';
        return false;
      }
    });
  }

  return label;
} //Returns formatted divs with property for Infos section


function formatInfo(item, className, title) {
  var titleContent = '';

  if (item) {
    if (title) {
      titleContent = '<div class="property">' + title + "</div>";
    }

    return '<div class="' + className + '">' + titleContent + item + "</div>";
  }

  return '';
} //Nom de l'activité


function formatName(name) {
  if (name.indexOf(" - ") != -1) name = name.substring(0, name.indexOf(" - "));
  return name;
}

; //Âge ou niveau

function formatAge(age) {
  if (age != null) {
    if (age.Min == 18) {
      return "Adulte";
    } else if (age.Max == null && age.Min !== null) {
      return age.Min + " ans et +";
    } else {
      return age.Min + " - " + age.Max + " ans";
    }
  } else {
    return "N/D";
  }
}

function formatStaff(staff) {
  if (staff) {
    return staff.FirstName + " " + staff.LastName;
  } else {
    return null;
  }
}

function formatLocation(loc) {
  // console.log(loc.FullName);
  var abbreviation = loc.FullName.match(/\(([^)]+)\)/);

  if (abbreviation) {
    return abbreviation[1];
  } else {
    return loc.FullName.split(/[\s-]+/).reduce(function (re, word) {
      return re += word.slice(0, 1);
    }, "").toUpperCase();
  }
} //Returns session season according to start and end date of activity


function formatSession(sDate, eDate) {
  var s = sDate.getMonth();
  var e = eDate.getMonth();

  switch (true) {
    case s < 3:
      return text.sessions.winter;
      break;

    case s < 6:
      return text.sessions.spring;
      break;

    case s > 6 && e > 6:
      return text.sessions.fall;
      break;

    case s > 6 && e < 6:
      return text.sessions.yearly;
      break;
  }
}

; //Horaire 

function formatSchedule(s, e) {
  day = text.daysOfWeek[s.getDay()];
  startTime = formatTime(s);
  endTime = formatTime(e);
  return day + " " + startTime + " - " + endTime;
}

;

function formatLiteralSchedule(s, e) {
  day = text.daysOfWeek[s.getDay()].toLowerCase();
  startTime = formatTime(s);
  endTime = formatTime(e);
  return "Le " + day + " de " + startTime + " à " + endTime;
}

;

function formatSpan(s, e) {
  var start = s.toLocaleDateString("fr-CA", {
    day: "numeric",
    month: "long"
  });
  var end = e.toLocaleDateString("fr-CA", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  return "Du " + start + " au " + end;
}

;

function formatTime(t) {
  return t.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric"
  });
}

function formatStartingDate(d) {
  return d.toLocaleDateString("fr-CA", {
    day: "numeric",
    month: "short"
  });
}

;

function formatPrice(p) {
  return p == 0 ? text.free : p + " $";
}

function getActivitiesById(obj) {
  var id = this;

  if (obj.CategoryId == id) {
    return true;
  } else {
    return false;
  }
}

;

var sortCategoriesByName = function sortCategoriesByName(res1, res2) {
  var prod1 = res1.name;
  var prod2 = res2.name;
  return prod1.localeCompare(prod2);
};

var sortByName = function sortByName(res1, res2) {
  //var prod1 = res1.Name;
  // var prod2 = res2.Name;
  var name1 = formatName(res1.Name);
  var name2 = formatName(res2.Name); //1st criterion

  if (name1 > name2) return 1;
  if (name1 < name2) return -1; //console.log('Egalité '+name1+" "+name2);

  var age1 = res1.Age !== null ? res1.Age.Min : 0;
  var age2 = res2.Age !== null ? res2.Age.Min : 0;
  if (age1 > age2) return 1;
  if (age1 < age2) return -1; //console.log("Egalité " + age1 + " " + age2);

  var day1 = new Date(res1.StartDate).getDay();
  var day2 = new Date(res2.StartDate).getDay(); //2nd criterion if tied

  if (day1 > day2) return 1;
  if (day1 < day2) return -1;
  var day1 = new Date(res1.StartDate).getHours();
  var day2 = new Date(res2.StartDate).getHours(); //2nd criterion if tied

  if (day1 > day2) return 1;
  if (day1 < day2) return -1;
  var day1 = new Date(res1.StartDate);
  var day2 = new Date(res2.StartDate); //2nd criterion if tied

  if (day1 > day2) return 1;
  if (day1 < day2) return -1; //return prod1.localeCompare(prod2);
}; //Return a div for the category Header


function createCategoryHeader(cat) {
  var top = $('<h1>', {
    text: cat.name,
    "class": 'top'
  });
  var columnHeaders = "<div class=\"grid\">\n\t\t\t<div class=\"column-header\">".concat(text.columnHeaders.activity, "</div>\t\n\t\t\t<div class=\"column-header\">").concat(text.columnHeaders.info, "</div>\t\t\n\t\t\t<div class=\"column-header\">").concat(text.columnHeaders.age, "</div>\n\t\t\t<div class=\"column-header\">").concat(text.columnHeaders.schedule, "</div>\t\n\t\t\t<div class=\"column-header\">").concat(text.columnHeaders.session, "</div>\t\n\t\t\t<div class=\"column-header\">").concat(text.columnHeaders.price, "</div>\t\n\t\t\t<div class=\"column-header\">").concat(text.columnHeaders.duration, "</div>\n\t\t\t<div class=\"column-header\">").concat(text.columnHeaders.location, "</div>\t\n\t\t\t<div class=\"column-header\">").concat(text.columnHeaders.staff, "</div>\n\t\t\t<div class=\"column-header\">").concat(text.columnHeaders.starting, "</div>\t\n</div>");
  var header = $("<li>", {
    "class": convertToClassSafe(cat.name) + " category-header"
  }).attr("data-always-visible", "true").append(top).append(columnHeaders);
  return header;
}

;

function convertToClassSafe(name) {
  return name.replace(/[^a-z0-9]/g, function (s) {
    var c = s.charCodeAt(0);
    if (c == 32) return "-";
    if (c >= 65 && c <= 90) return s.toLowerCase();
    return s.replace(/[\u0300-\u036f]/g, "").toLowerCase(); //.normalize("NFD")
  });
}