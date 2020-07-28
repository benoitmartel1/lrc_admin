function isNew(tags){
	var displayClass='hidden';
	$(tags).each(function(){
		if (this.Name.toLowerCase()=='nouveau') {
			console.log('match');
			displayClass = "";
		}
	});
	return displayClass;
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
		return '';
	}
}
function formatLocation(id){
	var textToReturn="";
	$(locations).each(function(){
		var loc=this;
		if($.inArray(id, this.Activities) !== -1){
			textToReturn=loc.Name;
		}
	});
	return textToReturn;
};
//Horaire 
function formatSchedule(s,e) {
	day=daysOfWeek[s.getDay()];
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

function getActivitiesByTag(obj){
	var tagName=this;
	if (obj.SubCategoryName == tagName) {
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

//Return a div for the category Header
function createCategoryHeader(cat, columnHeaders){
	var top=$('<h1>',{
		text:cat.name,
		class:'top'
	});

	var columnHeaders = `<div class="grid">
			<span class="column-header">${columnHeaders.activity}</span>	
			<span class="column-header">${columnHeaders.age}</span>	
			<span class="column-header">${columnHeaders.schedule}</span>	
			<span class="column-header">${columnHeaders.price}</span>	
			<span class="column-header">${columnHeaders.duration}</span>
			<span class="column-header">${columnHeaders.location}</span>	
			<span class="column-header">${columnHeaders.staff}</span>
			<span class="column-header">${columnHeaders.starting}</span>	
</div>`;
	
	var header = $("<li>", {
    class: cat.tag.toLowerCase() + " category-header",
  })
    .attr("data-always-visible", "true")
    .append(top)
	.append(columnHeaders);
	
	return header;

};