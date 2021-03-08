<?php
class Request{
 
    // database connection and table name
    private $conn;

    // object properties
    public $id;
    public $text;
    public $desc;
    public $seen;
 
    // constructor with $db as database connection
    public function __construct($db, $table_name){
        $this->conn = $db;
        $this->table_name = $table_name;
    }
    
    // read products
    function read($id = NULL){
        // select all query
        if(isset($id)){
            $query = "SELECT * FROM ".$this->table_name." WHERE id=".$id;
        }else
            $query = "SELECT * FROM ".$this->table_name;

        // prepare query statement
        $stmt = $this->conn->prepare($query);
 
        // execute query
        $stmt->execute();

        return $stmt;
    }
    
    // create product
    function insert(){
    $this->text=htmlspecialchars(strip_tags($this->text));
    $this->desc=htmlspecialchars(strip_tags($this->desc));
    if (isset($this->seen))
        $this->seen=htmlspecialchars(strip_tags($this->seen));
    if (isset($this->seen))
    // query to insert record
        $query = "INSERT INTO
                " . $this->table_name . "(`text`, `desc`, `seen`)
            VALUES('".$this->text."', '".$this->desc."', '".$this->seen."')";
    else
     // query to insert record
        $query = "INSERT INTO
                " . $this->table_name . "(`text`, `desc`)
        VALUES('".$this->text."', '".$this->desc."')";

    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // execute query
    $stmt->execute();
    $query = "SELECT * FROM " . $this->table_name . " WHERE id = LAST_INSERT_ID();";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
     
}

    // delete
    function delete($id){
        // select all query
        $id=htmlspecialchars(strip_tags($id));

        $query = "DElETE FROM ".$this->table_name." WHERE id=".$id;


        // prepare query statement
        $stmt = $this->conn->prepare($query);
 
        // execute query
        if($stmt->execute());
            return true;
        return false;
    }
    
    // update
    function update($id, $param, $value){
        // select all query

        $query = "UPDATE ".$this->table_name." SET `".$param."`='".$value."' WHERE id = ".$id;

        // prepare query statement
        $stmt = $this->conn->prepare($query);
 
        // execute query
        if($stmt->execute());
            return true;
        return false;
    }

    
}
?>