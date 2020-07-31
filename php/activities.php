<?php
//This file loads all activities currently offered in a $programs object.
//Returns $programs array.

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

$allActivities=array();

if(!$token){die("Connection Failure");}else{
    
    //If the token is obtained, then make the request to the API
    $auth_data = array('Authorization: Bearer '.$token);
    $auth_url = 'https://www.amilia.com/api/v3/fr/org/loisirsrenaudcoursol/locations';
    
	$locations=sendHTTPrequest($curl, $auth_url, $auth_data)->Items;

    
    $auth_url = 'https://www.amilia.com/api/v3/fr/org/loisirsrenaudcoursol/programs?showHidden=True';
	$programs=sendHTTPrequest($curl, $auth_url, $auth_data)->Items;

	//For each Program, get its activities and add them as a property
    foreach($programs as $program){
      	$id=$program->Id;

        if ($id==55462) {
    		$auth_url = 'https://www.amilia.com/api/v3/fr/org/loisirsrenaudcoursol/programs/'.$id.'/activities?showOccurrences=True&perPage=1000';
            $activities=sendHTTPrequest($curl, $auth_url, $auth_data)->Items;
            
            foreach($activities as $activity){
                
                //Handle Location
                $loc=$activity->Occurrences[0]->Location;
                if (!empty($loc)){
                    $locationId=(!empty($loc->TopParentId))?$loc->TopParentId:$loc->Id;
                    foreach($locations as $location){
                        if ($location->Id==$locationId){
                            $activity->Location=$location;
                        };
                    };
                };
                
                //Handle Staff
                $staff=$activity->Occurrences[0]->Staff;
                if (!empty($staff[0])){
                    $activity->Staff=$staff[0];
                };
                unset($activity->Occurrences);
                array_push($allActivities,$activity);
            };
    	};
    };
};
curl_close($curl);
?>