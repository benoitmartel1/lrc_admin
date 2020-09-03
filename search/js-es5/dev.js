"use strict";

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

  ;
}

var loc = {
  FullName: "Parc Bernard-Landry"
};
console.log(formatLocation(loc));