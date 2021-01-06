<?php

include('callApi.php');

//Returns $output JSON object that contains locations array and allActivities array for a given program.

if (!$token) {
    die("Connection Failure");
} else {
    
    //Get all programs
    $auth_url = $api_root.'programs?showHidden=True';
    $programs=sendHTTPrequest($curl, $auth_url, $auth_data)->Items;

    // echo json_encode($programs);
};


curl_close($curl);
