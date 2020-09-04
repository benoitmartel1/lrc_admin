<body>
<!-- <div class="black">1</div> -->
<div id="app">

<div class="header">
<div class="filters">
	<span id="text-filterBy"></span>
	<div id="age-drop" class="dropdown filter-drop">
		<button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<span id="text-age"></span>
		</button>
		<div data="age" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
			<a class="dropdown-item" data-type="age" data-value="18" href="#">Adulte</a>
			<div class="dropdown-divider"></div>
		</div>
	</div>
	<div id="day-drop" class="dropdown filter-drop">
		<button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
			aria-haspopup="true" aria-expanded="false">
			<span id="text-day"></span>
		</button>
		<div data="day" class="dropdown-menu" data-offset="window" aria-labelledby="dropdownMenuButton">	
		</div>
	</div>
	<div id="location-drop" class="dropdown filter-drop">
		<button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
			aria-haspopup="true" aria-expanded="false">
			<span id="text-location"></span>
		</button>
		<div data="location" class="dropdown-menu" data-offset="window" aria-labelledby="dropdownMenuButton">
		</div>
	</div>
	<div id="category-drop" class="filter-drop">
		<!-- <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
			aria-haspopup="true" aria-expanded="false">
			<span id="text-category"></span>
		</button> -->
		<select data="category">
			<option value="">Catégorie</option>
		</select>
	</div>
	

</div>
<div class="input-group search-field">
<div class="applied-filters"></div>
	<input type="text" class="search" placeholder="Quelle activité cherchez-vous?">
	<!-- <button class="erase bg-transparent" style="margin-left: -40px; z-index: 100;">
		<i class="fa fa-times"></i>
	</button> -->
	
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
