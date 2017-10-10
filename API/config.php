<?php
	$db_config = array(
        'host'		=> 'localhost',
        'dbName'	=> 'SingerSignUp',
        'user'	    => 'azure',
        'pwd'       => 'password',
    );

	foreach ($_SERVER as $key => $value) {
        if (strpos($key, "MYSQLCONNSTR_localdb") !== 0) {
            continue;
        }

        $db_config['host'] = preg_replace("/^.*Data Source=(.+?);.*$/", "\\1", $value);
        //$db_config['dbName'] = preg_replace("/^.*Database=(.+?);.*$/", "\\1", $value);
        $db_config['user'] = preg_replace("/^.*User Id=(.+?);.*$/", "\\1", $value);
        $db_config['pwd'] = preg_replace("/^.*Password=(.+?)$/", "\\1", $value);
    }
?>