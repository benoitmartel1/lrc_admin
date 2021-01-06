<?php

//Authorization obtained through Postman -- https://www.amilia.com/ApiDocs
$auth_data = array('Authorization: Basic bWFydGVsLmJAZ21haWwuY29tOmxhdXJlbnRtNw==');
$auth_url = 'https://www.amilia.com/api/v3/authenticate';

$api_root='https://www.amilia.com/api/v3/fr/org/loisirsrenaudcoursol/';

$curl = curl_init();

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

//If the token is obtained, then make the request to the API
if ($token) {
    $auth_data = array('Authorization: Bearer '.$token);
}
