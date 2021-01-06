<div class="header">
	<div class="log-info">
		<!-- logged in user information -->
		<?php  if (isset($_SESSION['username'])) : ?>
			<div>Bienvenue <strong><?php echo $_SESSION['username']; ?></strong></div>
			<div> <a href="https://renaudcoursol.com/admin/index.php?logout='1'"><i class="fa fa-sign-out logout"></i></a> </div>
		<?php endif ?>
	</div>
</div>