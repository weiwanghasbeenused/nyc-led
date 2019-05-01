<?
require_once('./views/head.php');  

// get time
date_default_timezone_set("America/New_York");
$now = date("h:i:sa");
    
// get temperature
require_once('./views/temp.php');  

// assemble $msg
$msg  = 'New York Consolidated . . . ';
$msg .= $now;
$msg .= ' currently ' . $output['wind_string'];
$msg .= ' /// Currently ' . $output['temp_f'] . ' degrees.';
$msg .= ' 0 1 2 3 4 5 6 7 8 9 Have a nice day.';
?>

<div id="mask">
    <div id="scroller"></div>   
</div>   
    
<script src="./static/js/scroller.js"></script>
<script>        
    Scroller.init('scroller', 120,7);
    Scroller.enqueue('<?= $msg; ?>');
    Scroller.start();
</script>

</html>
</body>
