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
    return $result;
};

//Get token
$token=sendHTTPrequest($curl, $auth_url, $auth_data);
$token=json_decode($token)->Token;

if(!$token){die("Connection Failure");}else{

	//If the token is obtained, then make the request to the API
    $auth_url = 'https://www.amilia.com/api/v3/fr/org/loisirsrenaudcoursol/programs';
    $auth_data = array('Authorization: Bearer '.$token);
	$result=sendHTTPrequest($curl, $auth_url, $auth_data);
	
	$programs=json_decode($result)->Items;

	//For each Program, get its activities and add them as a property
    foreach($programs as $program){
        $id=$program->Id;
        $auth_url = 'https://www.amilia.com/api/v3/fr/org/loisirsrenaudcoursol/programs/'.$id.'/activities';
        $auth_data = array('Authorization: Bearer '.$token);
        $result=sendHTTPrequest($curl, $auth_url, $auth_data);
		$activities=json_decode($result)->Items;
		//Add the activities array to property Activities of currently processed Program.
		$program->Activities=$activities;
	};
	echo $programs;
	$programs=json_encode($programs);
	echo 'XX';
	echo $programs;
	// $programsArray=object_to_array($programs);
	//
};
curl_close($curl);

// function object_to_array($data)
// {
//     if(is_array($data) || is_object($data))
//     {
//         $result = array();
 
//         foreach($data as $key => $value) {
//             $result[$key] = $this->object_to_array($value);
//         }
 
//         return $result;
//     }
 
//     return $data;
// }
?>