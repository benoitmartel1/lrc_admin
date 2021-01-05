<?php
//Returns $output JSON object that contains locations array and allActivities array for a given program.

//Authorization obtained through Postman -- https://www.amilia.com/ApiDocs
$auth_data = array('Authorization: Basic bWFydGVsLmJAZ21haWwuY29tOmxhdXJlbnRtNw==');
$auth_url = 'https://www.amilia.com/api/v3/authenticate';


//Eventually, get list of programs to show by querying a database so admnin can select which program.
if (isset($_GET['visiblePrograms'])) {
    $visiblePrograms=$_GET['visiblePrograms'];
} else {
    $visiblePrograms= [55462];
}


$curl = curl_init();
$allActivities=array();

//Request to the API
function sendHTTPrequest($curl, $url, $headers)
{
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result=curl_exec($curl);
    return json_decode($result);
};

//Get token
$token=sendHTTPrequest($curl, $auth_url, $auth_data)->Token;

if (!$token) {
    die("Connection Failure");
} else {
    
    //If the token is obtained, then make the request to the API
    $auth_data = array('Authorization: Bearer '.$token);
    
    //Get all locations
    $auth_url = 'https://www.amilia.com/api/v3/fr/org/loisirsrenaudcoursol/locations';
    $locations=sendHTTPrequest($curl, $auth_url, $auth_data)->Items;
    
    //Get all programs
    $auth_url = 'https://www.amilia.com/api/v3/fr/org/loisirsrenaudcoursol/programs?showHidden=True';
    $programs=sendHTTPrequest($curl, $auth_url, $auth_data)->Items;

    //For each Program, get its activities and add them as a property
    foreach ($programs as $program) {
        $id=$program->Id;

        if (in_array($id, $visiblePrograms)) {
            $auth_url = 'https://www.amilia.com/api/v3/fr/org/loisirsrenaudcoursol/programs/'.$id.'/activities?showOccurrences=True&perPage=1000';
            $activities=sendHTTPrequest($curl, $auth_url, $auth_data)->Items;
            
            foreach ($activities as $activity) {
                
                //Handle Location
                $loc=$activity->Occurrences[0]->Location;
                if (!empty($loc)) {
                    $location=getElemById($locations, $loc->Id);
                    if (!empty($location->TopParentId)) {
                        $location=getElemById($locations, $location->TopParentId);
                    }
                    $activity->Location=$location;
                };
                
                //Handle Staff
                $staff=$activity->Occurrences[0]->Staff;
                if (!empty($staff[0])) {
                    $activity->Staff=$staff[0];
                };
                unset($activity->Occurrences);
                array_push($allActivities, $activity);
            };
        };
    };
    $output=array(
        "allActivities" => $allActivities,
        "locations" => $locations
    );
    echo json_encode($output);
};
function getElemById($arr, $id)
{
    foreach ($arr as $elem) {
        if ($elem->Id==$id) {
            return $elem;
        }
    }
}


curl_close($curl);
