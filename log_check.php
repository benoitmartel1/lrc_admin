<?php
  session_start();
  if (!isset($_SESSION['username']) || is_null($_SESSION['privileges'])) {
      $_SESSION['msg'] = "You must log in first";
      header('location: https://renaudcoursol.com/admin/registration/login.php');
  }
  if (isset($_GET['logout'])) {
      session_destroy();
      unset($_SESSION['username']);
      unset($_SESSION['privileges']);
      header('location: https://renaudcoursol.com/admin/registration/login.php');
  }
