<?php
//This file loads all activities currently offered in a $programs object.

//Authorization obtained through Postman -- https://www.amilia.com/ApiDocs
$auth_data = array('Authorization: Basic bWFydGVsLmJAZ21haWwuY29tOmxhdXJlbnRtNw==');
$auth_url = 'https://www.amilia.com/api/v3/authenticate';

$curl = curl_init();

//Request to the API
function sendHTTPrequest($curl, $url, $headers){
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER,1);
    $result=curl_exec($curl);
    return json_decode($result);
};

//Get token
$token=sendHTTPrequest($curl, $auth_url, $auth_data)->Token;
// $token=json_decode($token)->Token;

if(!$token){die("Connection Failure");}else{

	//If the token is obtained, then make the request to the API
    $auth_url = 'https://www.amilia.com/api/v3/fr/org/loisirsrenaudcoursol/programs';
    $auth_data = array('Authorization: Bearer '.$token);
	$programs=sendHTTPrequest($curl, $auth_url, $auth_data)->Items;
	
	// $programs=json_decode($result)->Items;

	//For each Program, get its activities and add them as a property
    foreach($programs as $program){
        $id=$program->Id;
        $auth_url = 'https://www.amilia.com/api/v3/fr/org/loisirsrenaudcoursol/programs/'.$id.'/activities';
        $activities=sendHTTPrequest($curl, $auth_url, $auth_data)->Items;
		// $activities=json_decode($result)->Items;
		//Add the activities array to property Activities of currently processed Program.
		$program->Activities=$activities;
	};


	        $auth_url = 'https://www.amilia.com/api/v3/fr/org/loisirsrenaudcoursol/events?from=2020-01-01&to=2020-12-30';
			$staff=sendHTTPrequest($curl, $auth_url, $auth_data)->Items;
			foreach($staff as $item){
				$staff=$item->Staff;
				$id=$item->Activity->Id;
				echo "<pre>";
				print_r($id);
	        	$auth_url = 'https://www.amilia.com/api/v3/fr/org/loisirsrenaudcoursol/activities/'.$id.'/persons';
        		$persons=sendHTTPrequest($curl, $auth_url, $auth_data)->Items;
			// foreach($persons as $person){
			// 	print_r()
			// };
				  print_r($persons); echo "</pre>";
			}


};
curl_close($curl);
?>