<body>
<!-- <div class="black">1</div> -->
<div id="app">

<div class="header">

	<div class="row">
		<div class="col-sm-auto">
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
		</div>
		<div class="col">
			<div class="input-group search-field">
				<div class="applied-filters"></div>
				<input type="text" class="search" placeholder="Trouver une activité">
				</div>
			</div>
		<!-- <div class="col-3">   
			<a href="https://f3473a0389274419de2e-da1e801b21d4d53ba6c41ecf2e2ba403.ssl.cf2.rackcdn.com/DepliantLRCH2021.pdf" target=" _blank"><div class="btn btn-danger btn-md"><i class="fa fa-download" aria-hidden="true"></i>Télécharger le dépliant</div></a>
		</div>	 -->
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
