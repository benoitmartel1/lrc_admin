<?php
  session_start();

  if (!isset($_SESSION['username'])) {
      $_SESSION['msg'] = "You must log in first";
      header('location: '.$_SERVER['DOCUMENT_ROOT'].'/admin/registration/login.php');
  }
  if (isset($_GET['logout'])) {
      session_destroy();
      unset($_SESSION['username']);
      header('location: '.$_SERVER['DOCUMENT_ROOT'].'/admin/registration/login.php');
  }
