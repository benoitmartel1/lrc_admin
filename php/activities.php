<?php
$curl = curl_init();

function sendHTTPrequest($curl, $url, $headers){

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER,1);
    $result=curl_exec($curl);
    return $result;
};

$auth_data = array('Authorization: Basic bWFydGVsLmJAZ21haWwuY29tOmxhdXJlbnRtNw==');
$auth_url = 'https://www.amilia.com/api/v3/authenticate';


$token=sendHTTPrequest($curl, $auth_url, $auth_data);
$token=json_decode($token);

if(!$token){die("Connection Failure");}else{
    $auth_url = 'https://www.amilia.com/api/v3/fr/org/loisirsrenaudcoursol/programs';
    $auth_data = array('Authorization: Bearer '.$token->Token);
    $programs=sendHTTPrequest($curl, $auth_url, $auth_data);

    $pr=json_decode($programs);
    $items=$pr->Items;

    foreach($items as $program){
        $id=$program->Id;
        echo $program->Name.'<br><br>';
        $auth_url = 'https://www.amilia.com/api/v3/fr/org/loisirsrenaudcoursol/programs/'.$id.'/activities';
        $auth_data = array('Authorization: Bearer '.$token->Token);
        $result=sendHTTPrequest($curl, $auth_url, $auth_data);
        $activities=json_decode($result);
      $activities=$activities->Items;
      foreach($activities as $activity){
          echo $activity->Name.'<br>';
      }
    };
};

curl_close($curl);

?>