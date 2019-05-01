<?
// get time
date_default_timezone_set("America/New_York");
$now = date("h:i:sa");
    
// get temperature
require_once('temp.php');  

// assemble $msg

$msg  = 'New York Consolidated . . . ';
$msg .= $now;
$msg .= $output['wind_string'];
$msg .= ' /// Currently ' . $output['temp_f'] . ' degrees.';
$msg .= ' 0 1 2 3 4 5 6 7 8 9 Have a nice day.';
?>

<!doctype html>

<title>New York Consolidated</title>

<style>
body {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0px;
    background: #CCC;
    color:#FFF;
}
div#mask {
    position: absolute;
    overflow: hidden;
    /*
    width: 400px;
    height: 42px;
    */
    /* transform: scale(2,2); */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
div#scroller {
    width: 720px;
    /* width is 6 x cols init() */
    background:#000;
    overflow:hidden;
}
div#scroller div {
    width: 4px;
    height: 4px;
    float: left;
    margin: 1px;
    background: #111;        
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}
div#scroller div.on{
    /* filter: blur(1px); */
    background: #fff;
}
</style>

<div id="mask">
    <div id="scroller"></div>   
</div>   
    
<script src="./scroller.js"></script>
<script>        
    Scroller.init('scroller', 120,7);
    // Scroller.enqueue('New York Consolidated . . . Currently 46 degrees. Have a nice day.');
    Scroller.enqueue('<?= $msg; ?>');
    Scroller.start();
</script>
