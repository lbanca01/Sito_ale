<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once './config/database.php';
 
// instantiate product object
include_once './objects/request.php';
 
$database = new Database();
$db = $database->getConnection();
 
$request = new Request($db, $_GET['table']);

// get posted data

// make sure data is not empty
if(
    isset($_GET['text']) &&
    isset($_GET['desc'])
){
 
    // set product property values
    $request->text = $_GET['text'];
    $request->desc = $_GET['desc'];
    if (isset($_GET['seen']))
        $request->seen = $_GET['seen'];

 
    // create the product
    $stmt = $request->insert();
    $num = $stmt->rowCount();
// check if more than 0 record found
if($num>0){
 
    // products array
    $products_arr=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $product_item=array(
            "id" => $id,
            "text" => $text,
            "desc" => $desc
        );
 
        array_push($products_arr, $product_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show products data in json format
    echo json_encode($products_arr);
}
 
    // if unable to create the product, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create product."));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create product. Data is incomplete."));
}
?>