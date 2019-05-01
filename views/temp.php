<?

   // adapted from main.php whether-server at http://198.211.107.85
   // on linux, requires installing separate php lib
   // sudo apt-get install php7.2-xml
   // see https://www.php.net/manual/en/simplexml.installation.php

    // spoof user agent
    $context = stream_context_create(array(
        "http" => array(
          "header" => "User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36"
        )
      )
    );
    $req_url = "https://w1.weather.gov/xml/current_obs/KNYC.xml";
    $results = simplexml_load_string(file_get_contents($req_url, false, $context));

	// only using subset of all possible values in xml object
    // var_dump($results);

    // output
    $output = array(
      "current" => (string)$results->weather,
      "temp_f" => (float)$results->temp_f,
      "temp_c" => (float)$results->temp_c,
      "wind_string" => (string)$results->wind_string
    );

?>
