function isNew(tags){
	var label='';
	if(tags){
            $(tags).each(function () {
              if (this.Name.toLowerCase() == "nouveau") {
				label= `<span class="label">${text.new}</span>`;
				return false;
              }
            });
		  } 
		  return label;
}

//Nom de l'activité
function formatName(name) {
	if (name.indexOf("-")!=-1) 
		name = name.substring(0, name.indexOf("-"));
	return name;
};

//Âge ou niveau
function formatAge(age){
	if (age!=null){
		if (age.Min == 18) {
			return "Adulte";
		} else if (age.Max == null && age.Min !== null) {
			return age.Min + " ans et +";
		} else {
			return age.Min +" - " + age.Max+" ans";
		}
	}else{
		return "N/D"
	}
}
function formatStaff(staff){
	if(staff){
		return staff.FirstName;
	}else{
		return ' ';
	}
}
function formatLocation(loc){
	// console.log(loc.FullName);
	return loc.FullName.match(/\(([^)]+)\)/)[1];
};
//Returns session season according to start and end date of activity
function formatSession(sDate,eDate){
	var s=sDate.getMonth();
	var e=eDate.getMonth();
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
};

//Horaire 
function formatSchedule(s,e) {
	day=text.daysOfWeek[s.getDay()];
    startTime=formatTime(s);
	endTime = formatTime(e);
	return day+" "+startTime+" - "+endTime;
};

function formatTime(t){
	return t.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
    });
}
function formatStartingDate(d){
	return d.toLocaleDateString("fr-CA", {
	day: "numeric",
	month: "short"
  });
};

function formatPrice(p){
	return (p==0)? text.free:p+" $";
}

function getActivitiesById(obj){
	var id=this;
	if (obj.CategoryId == id) {
        return true;
      }else{
		  return false;
	  }
	};
	
var sortByName = function (res1, res2) {
  var prod1 = res1.Name;
  var prod2 = res2.Name;
  return prod1.localeCompare(prod2);
};

//Return the text for the div according to its id text-*name*
function placeTextInDiv(div){
	var name=$(div).attr('id');
	$(div).text(text[name.split("-")[1]]);
};	
//Return a div for the category Header
function createCategoryHeader(cat){
	var top=$('<h1>',{
		text:cat.name,
		class:'top'
	});

	var columnHeaders = `<div class="grid">
			<div class="column-header">${text.columnHeaders.activity}</div>	
			<div class="column-header">${text.columnHeaders.age}</div>	
			<div class="column-header">${text.columnHeaders.schedule}</div>	
			<div class="column-header">${text.columnHeaders.session}</div>	
			<div class="column-header">${text.columnHeaders.price}</div>	
			<div class="column-header">${text.columnHeaders.duration}</div>
			<div class="column-header">${text.columnHeaders.location}</div>	
			<div class="column-header">${text.columnHeaders.staff}</div>
			<div class="column-header">${text.columnHeaders.starting}</div>	
</div>`;
	
	var header = $("<li>", {
    class: convertToClassSafe(cat.name) + " category-header",
  })
    .attr("data-always-visible", "true")
    .append(top)
    .append(columnHeaders);
	
	return header;

};

function convertToClassSafe(name) {
  return name.replace(/[^a-z0-9]/g, function (s) {
    var c = s.charCodeAt(0);
    if (c == 32) return "-";
    if (c >= 65 && c <= 90) return s.toLowerCase();
    return s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  });
}