"use strict";

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function isNew(tags) {
  var label = "";

  if (tags) {
    $(tags).each(function () {
      if (this.Name.toLowerCase() == "nouveau") {
        label = '<span class="label">' + text.new + "</span>";
        return false;
      }
    });
  }

  return label;
} //Returns formatted divs with property for Infos section

function formatInfo(item, className, title) {
  var titleContent = "";

  if (item) {
    if (title) {
      titleContent = '<div class="property">' + title + "</div>";
    }

    return '<div class="' + className + '">' + titleContent + item + "</div>";
  }

  return "";
} //Nom de l'activité

function formatName(name) {
  if (name.indexOf(" - ") != -1) name = name.substring(0, name.indexOf(" - "));
  return name;
} //Âge ou niveau

function formatAge(age) {
  if (age != null) {
    var ans = age.Months ? " mois" : " ans";
    if (age.Min == 18 && !age.Months) {
      return "Adulte";
    } else if (age.Max == null && age.Min !== null) {
      return age.Min + ans + " et +";
    } else {
      var min = age.Min !== age.Max ? age.Min + " - " : "";
      return min + age.Max + ans;
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
    return loc.FullName.split(/[\s-]+/)
      .reduce(function (re, word) {
        return (re += word.slice(0, 1));
      }, "")
      .toUpperCase();
  }
} //Returns session season according to start and end date of activity

function formatSession(sDate, eDate) {
  var s = sDate.month();
  var e = eDate.month();

  switch (true) {
    case s < 2:
      return text.sessions.winter;
      break;

    case s < 4:
      return text.sessions.spring;
      break;

    case s < 8:
      return text.sessions.summer;
      break;

    case s > 7 && e > 7:
      return text.sessions.fall;
      break;

    case s > 7 && e < 5:
      return text.sessions.yearly;
      break;
  }
} //Horaire

function formatSchedule(s, e) {
  var day = text.daysOfWeek[s.day()];
  var startTime = formatTime(s);
  var endTime = formatTime(e);
  return day + " " + startTime + " - " + endTime;
}

function formatLiteralSchedule(s, e) {
  var day = text.daysOfWeek[s.day()].toLowerCase();
  var startTime = formatTime(s);
  var endTime = formatTime(e);
  return "Le " + day + " de " + startTime + " à " + endTime;
}

function formatSpan(s, e) {
  //     var start = s.toLocaleDateString("fr-CA", {
  //       day: "numeric",
  //       month: "long",
  //  YYYY	});
  // 	var end = e.toLocaleDateString("fr-CA", {
  //     day: "numeric",
  // 	month: "long",
  // 	year:"numeric"
  //   });
  return "Du " + s.format("D MMMM") + " au " + e.format("D MMMM YYYY");
}

function formatTime(t) {
  return t.format("H:mm"); // return t
  // .toLocaleTimeString("en-US", {
  //   hour12: false,
  //   hour: "numeric",
  //   minute: "numeric",
  // })
  // .replace(/^0+/, "");
}

function formatStartingDate(d) {
  return d.format("D MMM"); // 	return d.toLocaleDateString("fr-CA", {
  // 	day: "numeric",
  // 	month: "short"
  //   });
}

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

var sortCategoriesByName = function sortCategoriesByName(res1, res2) {
  var prod1 = res1.name;
  var prod2 = res2.name;
  return prod1.localeCompare(prod2);
};

var sortByName = function sortByName(res1, res2) {
  var name1 = formatName(res1.Name);
  var name2 = formatName(res2.Name); //1st criterion

  if (name1 > name2) return 1;
  if (name1 < name2) return -1;
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
  var day1 = new Date(res1.StartDate) - new Date();
  var day2 = new Date(res2.StartDate) - new Date(); //2nd criterion if tied

  if (day1 > day2) return 1;
  if (day1 < day2) return -1; //return prod1.localeCompare(prod2);
}; //Return a div for the category Header

function createCategoryHeader(cat) {
  var top = $("<h1>", {
    text: cat.name,
    class: "top",
  });
  var columnHeaders =
    '<div class="grid">\n\t\t\t<div class="column-header name">'
      .concat(
        text.columnHeaders.activity,
        '</div>\t\n\t\t\t<div class="column-header info">'
      )
      .concat(
        text.columnHeaders.info,
        '</div>\t\t\n\t\t\t<div class="column-header age">'
      )
      .concat(
        text.columnHeaders.age,
        '</div>\n\t\t\t<div class="column-header schedule">'
      )
      .concat(
        text.columnHeaders.schedule,
        '</div>\t\n\t\t\t<div class="column-header session">'
      )
      .concat(
        text.columnHeaders.session,
        '</div>\t\n\t\t\t<div class="column-header price">'
      )
      .concat(
        text.columnHeaders.price,
        '</div>\t\n\t\t\t<div class="column-header cours">'
      )
      .concat(
        text.columnHeaders.duration,
        '</div>\n\t\t\t<div class="column-header location">'
      )
      .concat(
        text.columnHeaders.location,
        '</div>\t\n\t\t\t<div class="column-header staff">'
      )
      .concat(
        text.columnHeaders.staff,
        '</div>\n\t\t\t<div class="column-header start">'
      )
      .concat(text.columnHeaders.start, "</div>\t\n</div>");
  var header = $("<div>", {
    class: convertToClassSafe(cat.name) + " category-header",
  })
    .attr("data-always-visible", "true")
    .append(top)
    .append(columnHeaders);
  return header;
}

var Latinise = {};
Latinise.latin_map = {
  Á: "A",
  Ă: "A",
  Ắ: "A",
  Ặ: "A",
  Ằ: "A",
  Ẳ: "A",
  Ẵ: "A",
  Ǎ: "A",
  Â: "A",
  Ấ: "A",
  Ậ: "A",
  Ầ: "A",
  Ẩ: "A",
  Ẫ: "A",
  Ä: "A",
  Ǟ: "A",
  Ȧ: "A",
  Ǡ: "A",
  Ạ: "A",
  Ȁ: "A",
  À: "A",
  Ả: "A",
  Ȃ: "A",
  Ā: "A",
  Ą: "A",
  Å: "A",
  Ǻ: "A",
  Ḁ: "A",
  Ⱥ: "A",
  Ã: "A",
  Ꜳ: "AA",
  Æ: "AE",
  Ǽ: "AE",
  Ǣ: "AE",
  Ꜵ: "AO",
  Ꜷ: "AU",
  Ꜹ: "AV",
  Ꜻ: "AV",
  Ꜽ: "AY",
  Ḃ: "B",
  Ḅ: "B",
  Ɓ: "B",
  Ḇ: "B",
  Ƀ: "B",
  Ƃ: "B",
  Ć: "C",
  Č: "C",
  Ç: "C",
  Ḉ: "C",
  Ĉ: "C",
  Ċ: "C",
  Ƈ: "C",
  Ȼ: "C",
  Ď: "D",
  Ḑ: "D",
  Ḓ: "D",
  Ḋ: "D",
  Ḍ: "D",
  Ɗ: "D",
  Ḏ: "D",
  ǲ: "D",
  ǅ: "D",
  Đ: "D",
  Ƌ: "D",
  Ǳ: "DZ",
  Ǆ: "DZ",
  É: "E",
  Ĕ: "E",
  Ě: "E",
  Ȩ: "E",
  Ḝ: "E",
  Ê: "E",
  Ế: "E",
  Ệ: "E",
  Ề: "E",
  Ể: "E",
  Ễ: "E",
  Ḙ: "E",
  Ë: "E",
  Ė: "E",
  Ẹ: "E",
  Ȅ: "E",
  È: "E",
  Ẻ: "E",
  Ȇ: "E",
  Ē: "E",
  Ḗ: "E",
  Ḕ: "E",
  Ę: "E",
  Ɇ: "E",
  Ẽ: "E",
  Ḛ: "E",
  Ꝫ: "ET",
  Ḟ: "F",
  Ƒ: "F",
  Ǵ: "G",
  Ğ: "G",
  Ǧ: "G",
  Ģ: "G",
  Ĝ: "G",
  Ġ: "G",
  Ɠ: "G",
  Ḡ: "G",
  Ǥ: "G",
  Ḫ: "H",
  Ȟ: "H",
  Ḩ: "H",
  Ĥ: "H",
  Ⱨ: "H",
  Ḧ: "H",
  Ḣ: "H",
  Ḥ: "H",
  Ħ: "H",
  Í: "I",
  Ĭ: "I",
  Ǐ: "I",
  Î: "I",
  Ï: "I",
  Ḯ: "I",
  İ: "I",
  Ị: "I",
  Ȉ: "I",
  Ì: "I",
  Ỉ: "I",
  Ȋ: "I",
  Ī: "I",
  Į: "I",
  Ɨ: "I",
  Ĩ: "I",
  Ḭ: "I",
  Ꝺ: "D",
  Ꝼ: "F",
  Ᵹ: "G",
  Ꞃ: "R",
  Ꞅ: "S",
  Ꞇ: "T",
  Ꝭ: "IS",
  Ĵ: "J",
  Ɉ: "J",
  Ḱ: "K",
  Ǩ: "K",
  Ķ: "K",
  Ⱪ: "K",
  Ꝃ: "K",
  Ḳ: "K",
  Ƙ: "K",
  Ḵ: "K",
  Ꝁ: "K",
  Ꝅ: "K",
  Ĺ: "L",
  Ƚ: "L",
  Ľ: "L",
  Ļ: "L",
  Ḽ: "L",
  Ḷ: "L",
  Ḹ: "L",
  Ⱡ: "L",
  Ꝉ: "L",
  Ḻ: "L",
  Ŀ: "L",
  Ɫ: "L",
  ǈ: "L",
  Ł: "L",
  Ǉ: "LJ",
  Ḿ: "M",
  Ṁ: "M",
  Ṃ: "M",
  Ɱ: "M",
  Ń: "N",
  Ň: "N",
  Ņ: "N",
  Ṋ: "N",
  Ṅ: "N",
  Ṇ: "N",
  Ǹ: "N",
  Ɲ: "N",
  Ṉ: "N",
  Ƞ: "N",
  ǋ: "N",
  Ñ: "N",
  Ǌ: "NJ",
  Ó: "O",
  Ŏ: "O",
  Ǒ: "O",
  Ô: "O",
  Ố: "O",
  Ộ: "O",
  Ồ: "O",
  Ổ: "O",
  Ỗ: "O",
  Ö: "O",
  Ȫ: "O",
  Ȯ: "O",
  Ȱ: "O",
  Ọ: "O",
  Ő: "O",
  Ȍ: "O",
  Ò: "O",
  Ỏ: "O",
  Ơ: "O",
  Ớ: "O",
  Ợ: "O",
  Ờ: "O",
  Ở: "O",
  Ỡ: "O",
  Ȏ: "O",
  Ꝋ: "O",
  Ꝍ: "O",
  Ō: "O",
  Ṓ: "O",
  Ṑ: "O",
  Ɵ: "O",
  Ǫ: "O",
  Ǭ: "O",
  Ø: "O",
  Ǿ: "O",
  Õ: "O",
  Ṍ: "O",
  Ṏ: "O",
  Ȭ: "O",
  Ƣ: "OI",
  Ꝏ: "OO",
  Ɛ: "E",
  Ɔ: "O",
  Ȣ: "OU",
  Ṕ: "P",
  Ṗ: "P",
  Ꝓ: "P",
  Ƥ: "P",
  Ꝕ: "P",
  Ᵽ: "P",
  Ꝑ: "P",
  Ꝙ: "Q",
  Ꝗ: "Q",
  Ŕ: "R",
  Ř: "R",
  Ŗ: "R",
  Ṙ: "R",
  Ṛ: "R",
  Ṝ: "R",
  Ȑ: "R",
  Ȓ: "R",
  Ṟ: "R",
  Ɍ: "R",
  Ɽ: "R",
  Ꜿ: "C",
  Ǝ: "E",
  Ś: "S",
  Ṥ: "S",
  Š: "S",
  Ṧ: "S",
  Ş: "S",
  Ŝ: "S",
  Ș: "S",
  Ṡ: "S",
  Ṣ: "S",
  Ṩ: "S",
  Ť: "T",
  Ţ: "T",
  Ṱ: "T",
  Ț: "T",
  Ⱦ: "T",
  Ṫ: "T",
  Ṭ: "T",
  Ƭ: "T",
  Ṯ: "T",
  Ʈ: "T",
  Ŧ: "T",
  Ɐ: "A",
  Ꞁ: "L",
  Ɯ: "M",
  Ʌ: "V",
  Ꜩ: "TZ",
  Ú: "U",
  Ŭ: "U",
  Ǔ: "U",
  Û: "U",
  Ṷ: "U",
  Ü: "U",
  Ǘ: "U",
  Ǚ: "U",
  Ǜ: "U",
  Ǖ: "U",
  Ṳ: "U",
  Ụ: "U",
  Ű: "U",
  Ȕ: "U",
  Ù: "U",
  Ủ: "U",
  Ư: "U",
  Ứ: "U",
  Ự: "U",
  Ừ: "U",
  Ử: "U",
  Ữ: "U",
  Ȗ: "U",
  Ū: "U",
  Ṻ: "U",
  Ų: "U",
  Ů: "U",
  Ũ: "U",
  Ṹ: "U",
  Ṵ: "U",
  Ꝟ: "V",
  Ṿ: "V",
  Ʋ: "V",
  Ṽ: "V",
  Ꝡ: "VY",
  Ẃ: "W",
  Ŵ: "W",
  Ẅ: "W",
  Ẇ: "W",
  Ẉ: "W",
  Ẁ: "W",
  Ⱳ: "W",
  Ẍ: "X",
  Ẋ: "X",
  Ý: "Y",
  Ŷ: "Y",
  Ÿ: "Y",
  Ẏ: "Y",
  Ỵ: "Y",
  Ỳ: "Y",
  Ƴ: "Y",
  Ỷ: "Y",
  Ỿ: "Y",
  Ȳ: "Y",
  Ɏ: "Y",
  Ỹ: "Y",
  Ź: "Z",
  Ž: "Z",
  Ẑ: "Z",
  Ⱬ: "Z",
  Ż: "Z",
  Ẓ: "Z",
  Ȥ: "Z",
  Ẕ: "Z",
  Ƶ: "Z",
  Ĳ: "IJ",
  Œ: "OE",
  ᴀ: "A",
  ᴁ: "AE",
  ʙ: "B",
  ᴃ: "B",
  ᴄ: "C",
  ᴅ: "D",
  ᴇ: "E",
  ꜰ: "F",
  ɢ: "G",
  ʛ: "G",
  ʜ: "H",
  ɪ: "I",
  ʁ: "R",
  ᴊ: "J",
  ᴋ: "K",
  ʟ: "L",
  ᴌ: "L",
  ᴍ: "M",
  ɴ: "N",
  ᴏ: "O",
  ɶ: "OE",
  ᴐ: "O",
  ᴕ: "OU",
  ᴘ: "P",
  ʀ: "R",
  ᴎ: "N",
  ᴙ: "R",
  ꜱ: "S",
  ᴛ: "T",
  ⱻ: "E",
  ᴚ: "R",
  ᴜ: "U",
  ᴠ: "V",
  ᴡ: "W",
  ʏ: "Y",
  ᴢ: "Z",
  á: "a",
  ă: "a",
  ắ: "a",
  ặ: "a",
  ằ: "a",
  ẳ: "a",
  ẵ: "a",
  ǎ: "a",
  â: "a",
  ấ: "a",
  ậ: "a",
  ầ: "a",
  ẩ: "a",
  ẫ: "a",
  ä: "a",
  ǟ: "a",
  ȧ: "a",
  ǡ: "a",
  ạ: "a",
  ȁ: "a",
  à: "a",
  ả: "a",
  ȃ: "a",
  ā: "a",
  ą: "a",
  ᶏ: "a",
  ẚ: "a",
  å: "a",
  ǻ: "a",
  ḁ: "a",
  ⱥ: "a",
  ã: "a",
  ꜳ: "aa",
  æ: "ae",
  ǽ: "ae",
  ǣ: "ae",
  ꜵ: "ao",
  ꜷ: "au",
  ꜹ: "av",
  ꜻ: "av",
  ꜽ: "ay",
  ḃ: "b",
  ḅ: "b",
  ɓ: "b",
  ḇ: "b",
  ᵬ: "b",
  ᶀ: "b",
  ƀ: "b",
  ƃ: "b",
  ɵ: "o",
  ć: "c",
  č: "c",
  ç: "c",
  ḉ: "c",
  ĉ: "c",
  ɕ: "c",
  ċ: "c",
  ƈ: "c",
  ȼ: "c",
  ď: "d",
  ḑ: "d",
  ḓ: "d",
  ȡ: "d",
  ḋ: "d",
  ḍ: "d",
  ɗ: "d",
  ᶑ: "d",
  ḏ: "d",
  ᵭ: "d",
  ᶁ: "d",
  đ: "d",
  ɖ: "d",
  ƌ: "d",
  ı: "i",
  ȷ: "j",
  ɟ: "j",
  ʄ: "j",
  ǳ: "dz",
  ǆ: "dz",
  é: "e",
  ĕ: "e",
  ě: "e",
  ȩ: "e",
  ḝ: "e",
  ê: "e",
  ế: "e",
  ệ: "e",
  ề: "e",
  ể: "e",
  ễ: "e",
  ḙ: "e",
  ë: "e",
  ė: "e",
  ẹ: "e",
  ȅ: "e",
  è: "e",
  ẻ: "e",
  ȇ: "e",
  ē: "e",
  ḗ: "e",
  ḕ: "e",
  ⱸ: "e",
  ę: "e",
  ᶒ: "e",
  ɇ: "e",
  ẽ: "e",
  ḛ: "e",
  ꝫ: "et",
  ḟ: "f",
  ƒ: "f",
  ᵮ: "f",
  ᶂ: "f",
  ǵ: "g",
  ğ: "g",
  ǧ: "g",
  ģ: "g",
  ĝ: "g",
  ġ: "g",
  ɠ: "g",
  ḡ: "g",
  ᶃ: "g",
  ǥ: "g",
  ḫ: "h",
  ȟ: "h",
  ḩ: "h",
  ĥ: "h",
  ⱨ: "h",
  ḧ: "h",
  ḣ: "h",
  ḥ: "h",
  ɦ: "h",
  ẖ: "h",
  ħ: "h",
  ƕ: "hv",
  í: "i",
  ĭ: "i",
  ǐ: "i",
  î: "i",
  ï: "i",
  ḯ: "i",
  ị: "i",
  ȉ: "i",
  ì: "i",
  ỉ: "i",
  ȋ: "i",
  ī: "i",
  į: "i",
  ᶖ: "i",
  ɨ: "i",
  ĩ: "i",
  ḭ: "i",
  ꝺ: "d",
  ꝼ: "f",
  ᵹ: "g",
  ꞃ: "r",
  ꞅ: "s",
  ꞇ: "t",
  ꝭ: "is",
  ǰ: "j",
  ĵ: "j",
  ʝ: "j",
  ɉ: "j",
  ḱ: "k",
  ǩ: "k",
  ķ: "k",
  ⱪ: "k",
  ꝃ: "k",
  ḳ: "k",
  ƙ: "k",
  ḵ: "k",
  ᶄ: "k",
  ꝁ: "k",
  ꝅ: "k",
  ĺ: "l",
  ƚ: "l",
  ɬ: "l",
  ľ: "l",
  ļ: "l",
  ḽ: "l",
  ȴ: "l",
  ḷ: "l",
  ḹ: "l",
  ⱡ: "l",
  ꝉ: "l",
  ḻ: "l",
  ŀ: "l",
  ɫ: "l",
  ᶅ: "l",
  ɭ: "l",
  ł: "l",
  ǉ: "lj",
  ſ: "s",
  ẜ: "s",
  ẛ: "s",
  ẝ: "s",
  ḿ: "m",
  ṁ: "m",
  ṃ: "m",
  ɱ: "m",
  ᵯ: "m",
  ᶆ: "m",
  ń: "n",
  ň: "n",
  ņ: "n",
  ṋ: "n",
  ȵ: "n",
  ṅ: "n",
  ṇ: "n",
  ǹ: "n",
  ɲ: "n",
  ṉ: "n",
  ƞ: "n",
  ᵰ: "n",
  ᶇ: "n",
  ɳ: "n",
  ñ: "n",
  ǌ: "nj",
  ó: "o",
  ŏ: "o",
  ǒ: "o",
  ô: "o",
  ố: "o",
  ộ: "o",
  ồ: "o",
  ổ: "o",
  ỗ: "o",
  ö: "o",
  ȫ: "o",
  ȯ: "o",
  ȱ: "o",
  ọ: "o",
  ő: "o",
  ȍ: "o",
  ò: "o",
  ỏ: "o",
  ơ: "o",
  ớ: "o",
  ợ: "o",
  ờ: "o",
  ở: "o",
  ỡ: "o",
  ȏ: "o",
  ꝋ: "o",
  ꝍ: "o",
  ⱺ: "o",
  ō: "o",
  ṓ: "o",
  ṑ: "o",
  ǫ: "o",
  ǭ: "o",
  ø: "o",
  ǿ: "o",
  õ: "o",
  ṍ: "o",
  ṏ: "o",
  ȭ: "o",
  ƣ: "oi",
  ꝏ: "oo",
  ɛ: "e",
  ᶓ: "e",
  ɔ: "o",
  ᶗ: "o",
  ȣ: "ou",
  ṕ: "p",
  ṗ: "p",
  ꝓ: "p",
  ƥ: "p",
  ᵱ: "p",
  ᶈ: "p",
  ꝕ: "p",
  ᵽ: "p",
  ꝑ: "p",
  ꝙ: "q",
  ʠ: "q",
  ɋ: "q",
  ꝗ: "q",
  ŕ: "r",
  ř: "r",
  ŗ: "r",
  ṙ: "r",
  ṛ: "r",
  ṝ: "r",
  ȑ: "r",
  ɾ: "r",
  ᵳ: "r",
  ȓ: "r",
  ṟ: "r",
  ɼ: "r",
  ᵲ: "r",
  ᶉ: "r",
  ɍ: "r",
  ɽ: "r",
  ↄ: "c",
  ꜿ: "c",
  ɘ: "e",
  ɿ: "r",
  ś: "s",
  ṥ: "s",
  š: "s",
  ṧ: "s",
  ş: "s",
  ŝ: "s",
  ș: "s",
  ṡ: "s",
  ṣ: "s",
  ṩ: "s",
  ʂ: "s",
  ᵴ: "s",
  ᶊ: "s",
  ȿ: "s",
  ɡ: "g",
  ᴑ: "o",
  ᴓ: "o",
  ᴝ: "u",
  ť: "t",
  ţ: "t",
  ṱ: "t",
  ț: "t",
  ȶ: "t",
  ẗ: "t",
  ⱦ: "t",
  ṫ: "t",
  ṭ: "t",
  ƭ: "t",
  ṯ: "t",
  ᵵ: "t",
  ƫ: "t",
  ʈ: "t",
  ŧ: "t",
  ᵺ: "th",
  ɐ: "a",
  ᴂ: "ae",
  ǝ: "e",
  ᵷ: "g",
  ɥ: "h",
  ʮ: "h",
  ʯ: "h",
  ᴉ: "i",
  ʞ: "k",
  ꞁ: "l",
  ɯ: "m",
  ɰ: "m",
  ᴔ: "oe",
  ɹ: "r",
  ɻ: "r",
  ɺ: "r",
  ⱹ: "r",
  ʇ: "t",
  ʌ: "v",
  ʍ: "w",
  ʎ: "y",
  ꜩ: "tz",
  ú: "u",
  ŭ: "u",
  ǔ: "u",
  û: "u",
  ṷ: "u",
  ü: "u",
  ǘ: "u",
  ǚ: "u",
  ǜ: "u",
  ǖ: "u",
  ṳ: "u",
  ụ: "u",
  ű: "u",
  ȕ: "u",
  ù: "u",
  ủ: "u",
  ư: "u",
  ứ: "u",
  ự: "u",
  ừ: "u",
  ử: "u",
  ữ: "u",
  ȗ: "u",
  ū: "u",
  ṻ: "u",
  ų: "u",
  ᶙ: "u",
  ů: "u",
  ũ: "u",
  ṹ: "u",
  ṵ: "u",
  ᵫ: "ue",
  ꝸ: "um",
  ⱴ: "v",
  ꝟ: "v",
  ṿ: "v",
  ʋ: "v",
  ᶌ: "v",
  ⱱ: "v",
  ṽ: "v",
  ꝡ: "vy",
  ẃ: "w",
  ŵ: "w",
  ẅ: "w",
  ẇ: "w",
  ẉ: "w",
  ẁ: "w",
  ⱳ: "w",
  ẘ: "w",
  ẍ: "x",
  ẋ: "x",
  ᶍ: "x",
  ý: "y",
  ŷ: "y",
  ÿ: "y",
  ẏ: "y",
  ỵ: "y",
  ỳ: "y",
  ƴ: "y",
  ỷ: "y",
  ỿ: "y",
  ȳ: "y",
  ẙ: "y",
  ɏ: "y",
  ỹ: "y",
  ź: "z",
  ž: "z",
  ẑ: "z",
  ʑ: "z",
  ⱬ: "z",
  ż: "z",
  ẓ: "z",
  ȥ: "z",
  ẕ: "z",
  ᵶ: "z",
  ᶎ: "z",
  ʐ: "z",
  ƶ: "z",
  ɀ: "z",
  ﬀ: "ff",
  ﬃ: "ffi",
  ﬄ: "ffl",
  ﬁ: "fi",
  ﬂ: "fl",
  ĳ: "ij",
  œ: "oe",
  ﬆ: "st",
  ₐ: "a",
  ₑ: "e",
  ᵢ: "i",
  ⱼ: "j",
  ₒ: "o",
  ᵣ: "r",
  ᵤ: "u",
  ᵥ: "v",
  ₓ: "x",
};

String.prototype.latinise = function () {
  return this.replace(/[^A-Za-z0-9\[\] ]/g, function (a) {
    return Latinise.latin_map[a] || a;
  });
};

String.prototype.latinize = String.prototype.latinise;

String.prototype.isLatin = function () {
  return this == this.latinise();
};

var capitalize = function capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

function convertToClassSafe(name) {
  return name.replace(/[^a-z0-9]/g, function (s) {
    var c = s.charCodeAt(0);
    if (c == 32) return "-";
    if (c >= 65 && c <= 90) return s.toLowerCase();
    s = s.latinize();
    return s.replace(/[\u0300-\u036f]/g, "").toLowerCase(); //.normalize("NFD")
  });
}

function getUniqueArray() {
  var arr =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var compareProps =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var modifiedArray = [];
  if (compareProps.length === 0 && arr.length > 0)
    compareProps.push.apply(
      compareProps,
      _toConsumableArray(Object.keys(arr[0]))
    );
  arr.map(function (item) {
    if (modifiedArray.length === 0) {
      modifiedArray.push(item);
    } else {
      if (
        !modifiedArray.some(function (item2) {
          return compareProps.every(function (eachProps) {
            return item2[eachProps] === item[eachProps];
          });
        })
      ) {
        modifiedArray.push(item);
      }
    }
  });
  return modifiedArray;
}
