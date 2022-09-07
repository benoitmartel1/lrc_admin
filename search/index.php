<body>
<!-- <div class="black">1</div> -->
<div id="app">

<div class="header">

	<div class="row">
		<div class="col">
			<div class="input-group search-field">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" height="30" style="margin: 5px;margin-right: 15px;"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" style="fill: #aaa"></path></svg>
				<input type="text" class="search" placeholder="Trouver une activité">
			</div>
		</div>
		<div class="col filter-title">
		    <span id="text-filterBy"></span>
		</div>
		<div class="col">
			<div class="filters">
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
			<div class="applied-filters"></div>
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
