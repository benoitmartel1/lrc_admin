<body>
<!-- <div class="black">1</div> -->
<div id="app">

<div class="header">
<div class="filters">
	<span id="text-filterBy"></span>
		<select id="age-drop" class="btn btn-outline-primary" data="age">
			<option id="text-age" hidden selected disabled></option>
		</select>
		<select id="day-drop" class="btn btn-outline-primary" data="day">
			<option id="text-day" hidden selected disabled></option>
		</select>
		<select id="location-drop" class="btn btn-outline-primary" data="location">
			<option id="text-location" hidden selected disabled></option>
		</select>
		<select id="category-drop" class="btn btn-outline-primary" data="category">
			<option id="text-category" hidden selected disabled></option>
		</select>
</div>
	<div class="row">
		<div class="col-9">
			<div class="input-group search-field">
				<input type="text" class="search" placeholder="Trouver une activité"><div class="applied-filters"></div>
				</div>
			</div>
		<div class="col-3">   
			<a href="https://renaudcoursol.com/wp-content/uploads/2021/01/DepliantLRCH2021-2.pdf" target=" _blank"><div class="btn btn-danger btn-lg"><i class="fa fa-download" aria-hidden="true"></i>Télécharger le dépliant</div></a>
		</div>	
	</div>
</div>
<div >


<!-- class="sort" automagically makes an element a sort buttons. The date-sort value decides what to sort by. -->
  <!-- <button class="sort" data-sort="name">
    Sort
  </button> -->

	<div id="text-noResult" class="noResult header-padding"></div>

<!-- Child elements of container with class="list" becomes list items -->
  <ul class="list no-select">
  </ul>
  <!-- Loading animation -->
  <div class="loading header-padding">
	  <h5 id="text-wait"></h5>
	<div class="lds-ellipsis loading-animation"><div></div><div></div><div></div><div></div></div>
		
  </div>
</div>
</div>
</body>
