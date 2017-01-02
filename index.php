 <?php

require 'engine.php';

# Initialzie database
$db = new SQLite3('database.db');

require 'data.php';

# ========

$groups = array();
$groups_result = $db->query('SELECT * FROM groups;');
while($result = $groups_result->fetchArray(SQLITE3_ASSOC)) {
	$groups[$result['id']] = $result['name'];
}

# Fetch functions

// echo(json_encode($groups));

$grouped_functions = array();
$functions = $db->query('SELECT * FROM functions;');
while($row = $functions->fetchArray(SQLITE3_ASSOC)){
    $grouped_functions[$groups[$row['group_id']]][] = $row;
}


$message = new Template("templates/index.html");
$message->grouped_functions = $grouped_functions;

echo $message;