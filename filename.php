<?php
// Connect to mysql database
$mysqli = new mysqli("localhost","root","","database_name");
if ($mysqli -> connect_errno) {
echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
exit();
}
?>

<?php
$city = $_GET['city'];
$key = "249fea01bc6f32b2f0c1becf42dc5723";  //Api key

// Fetch required fields
$fetch_url = 'http://api.openweathermap.org/data/2.5/weather?q='.$city.'&units=metric&appid='.$key;
$weather_data = json_decode(file_get_contents($fetch_url), true);
$weather_temperature = $weather_data['main']['temp'];
$weather_description = $weather_data['weather'][0]['description'];
$weather_icon = $weather_data['weather'][0]['icon'];
$weather_wind = $weather_data['wind']['speed'];
$weather_pressure = $weather_data['main']['pressure'];
$weather_humidity = $weather_data['main']['humidity'];
$weather_when = date("Y-m-d H:i:s"); // current time
$country = $weather_data['sys']['country'];
?>

<?php
// Build INSERT SQL statement
$suz="insert into weather values('$weather_temperature','$weather_description','$weather_icon','$weather_wind',
                                  '$weather_pressure','$weather_humidity','$weather_when','$city', '$country');";

// Run SQL statement and report errors
if(mysqli_query($mysqli,$suz)){          
 }
else{
    echo " try-again";
}
?>

<?php
// Execute SQL query // Select weather data for given parameters
$sql = "SELECT * FROM weather ORDER BY weather_when DESC limit 1";
$result = $mysqli -> query($sql);

// Get data, convert to JSON and print
$row = $result -> fetch_assoc();
print json_encode($row);

 // Free result set and close connection
$result -> free_result();
$mysqli -> close(); 
?>