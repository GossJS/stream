<?php
$fp = fsockopen("151.248.115.32", 80, $errno, $errstr, 30);
if (!$fp) {
    echo "$errstr ($errno)<br />\n";
} else {
    $out = "GET /api2/buffer2/20 HTTP/1.1\r\n";
    $out .= "Host: kodaktor.ru\r\n";
    $out .= "Connection: Close\r\n\r\n";
    fwrite($fp, $out);
    $add = false;
    $sum = 0;
    while (!feof($fp)) {
         $e = fgets($fp, 5);
         $ae =  str_split($e);
         $v =  array_filter($ae, function ($x){return (ord($x) == 0 );});
         if ( !$add && count($v) > 0 )  $add = true; 
         if ($add)  $sum += 4;
         $v = implode('', array_filter($ae, function ($x){return ($x >= 'a' && $x <= 'z');}));
         if (  strlen($v) == 4 && $v == 'cats')  die ("$v " . floor($sum / 65536));
    }
    fclose($fp);
}
?>
