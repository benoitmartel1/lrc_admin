<div class="header">
	<div class="navbar">
		<a class="/" href="#"><i class="fa fa-fw fa-home"></i> Home</a> 
		<a href="search/manager.php"><i class="far fa-list-alt"></i> Activités</a> 
		<a href="stats/"><i class="fas fa-chart-bar"></i> Statistiques</a> 
	</div>
	<div class="log-info">
		<!-- logged in user information -->
		<?php  if (isset($_SESSION['username'])) : ?>
			<div>Bienvenue <strong><?php echo $_SESSION['username']; ?></strong></div>
			<div> <a href="https://renaudcoursol.com/admin/index.php?logout='1'"><i class="fa fa-sign-out logout"></i></a> </div>
		<?php endif ?>
	</div>
</div>