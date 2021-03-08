<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object file
include_once './config/database.php';
include_once './objects/request.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$request = new Request($db, $_GET['table']);

// delete the product
if(isset($_GET['id']) && isset($_GET['param']) && isset($_GET['value'])){
    if ($request->update($_GET['id'], $_GET['param'], $_GET['value'])){
        // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
    echo json_encode(array("message" => "Product was updated."));
    }// if unable to delete the product
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to update product."));
}
 
    
}else{
      // set response code - 503 service unavailable
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Not enought info."));
}
 

?>