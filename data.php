<?php

$db->query('DROP TABLE functions;');

# Create table if not exists
$db->query('CREATE TABLE IF NOT EXISTS functions (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
	name VARCHAR(20) UNIQUE, 
	jquery TEXT, 
	mootools TEXT, 
	underscore TEXT, 
	native TEXT, 
	lodash TEXT,
	group_id INTEGER
);');

$db->query('CREATE TABLE IF NOT EXISTS groups (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
	name VARCHAR(10) UNIQUE
);');

$db->query("INSERT OR IGNORE INTO 'groups' ('name') VALUES
  ('Massiv'),
  ('Objekt'),
  ('String'),
  ('DOM')
;");

// 1 - Massiiv
// 2 - Objekt
// 3 - String
// 4 - DOM

$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Korduvate elementide kustutamine', 
	'$.unique(array1);', 
	'array1.unique();', 
	'_.uniq(array1);',
	'array1.filter(function(item, i, ar){ return array1.indexOf(item) === i; });',
	'lodash.uniq(array1);',
	1
);"); // +

// $db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
// 	'Massiivide ühendamine', 
// 	'new_array = $.merge([], array1); $.merge(new_array, array2)', 
// 	'new_array = Array.clone(array1); new_array.combine(array2)', 
// 	'',
// 	'new_array = array1.slice(0); new_array.concat(array2);',
// 	'new_array = lodash.clone(array1); lodash.merge(new_array, array2);',
// 	1
// );"); // +


$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Massiivi elementide segunemine', 
	'', 
	'array1.shuffle();', 
	'_.shuffle(array1);',
	'array1.sort(function() {
  return .5 - Math.random();
});',
	'lodash.shuffle(array1);',
	1
);"); // +

$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Elementidele väärtuse omastamine',  
	'$.map(array1, square);', 
	'array1.map(square);', 
	'_(array1).map(square);',
	'array1.map(square);',
	'lodash.map(array1, square);',
	1
);"); // + funktsiooni kutsumine iga massivi elemendi jaoks

$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Massiivi filtreerimine', 
	'$(array1).filter(isEven);', 
	'array1.filter(isEven)', 
	'_(array1).filter(isEven);',
	'array1.filter(isEven);',
	'lodash.filter(array1, isEven);',
	1
);"); // +

// $db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
// 	'Ümardamine', 
// 	'', 
// 	'(23.5).round()', 
// 	'',
// 	'Math.round(23.5);',
// 	'lodash.round(23.5);',
// 	1
// );"); // +

$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Pikkuse arvutamine', 
	'$(array1).length', 
	'', 
	'_.size(array1);',
	'array1.length',
	'lodash.size(array1);',
	1
);"); //+

$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Väiksema elemendi otsimine', 
	'', 
	'array1.min();', 
	'_.min(array1);',
	'Math.min(null, array1);',
	'lodash.min(array1);',
	1
);"); // +

$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Suurema elemendi otsimine', 
	'', 
	'array1.max();', 
	'_.max(array1);',
	'Math.max(null, array1);',
	'lodash.max(array1);',
	1
);"); // +


$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Elemendi sisaldamise kontroll massiivis', 
	'$.inArray(5, array1);', 
	'array1.contains(5);', 
	'_.contains(array1, 5);',
	'array1.indexOf(5);',
	'lodash.includes(array1, 5);',
	1
);"); // +


$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Suvalise elemendi saamine (random)', 
	'', 
	'array1.getRandom(isEven);', 
	'_.sample(array1);',
	'array1[Math.floor(Math.random() * array1.length)];',
	'lodash.sample(array1, isEven);',
	1
);"); // +

// $db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
// 	'pluck', 
// 	'$.map(testobj_array, function(o) { return o[searchkey]; });', 
// 	'testobj_array.pluck(searchkey);', 
// 	'_.pluck(testobj_array, searchkey);',
// 	'testobj_array.map(function(obj) {return obj[searchkey];});',
// 	'lodash.map(testobj_array, searchkey);',
// 	1
// );"); // +

// $db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
// 	'flatten', 
// 	'$.map( array_of_arrays, function(n){ return n; });', 
// 	'array_of_arrays.flatten();', 
// 	'_.flatten(array_of_arrays);',
// 	'[].concat.apply([], array_of_arrays);',
// 	'lodash.flatten(array_of_arrays);',
// 	1
// );"); // +

// ------------------------------- OBJEKT ----------------------------------

$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Objekti pikkuse arvutamine', 
	'$(testobj1).length', 
	'testobj1.getLength()', 
	'_.size(testobj1);',
	'testobj1.length',
	'lodash.size(testobj1);',
	2
);"); //+


$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Võtmete saamine (getKeys)', 
	'$.map(testobj1, function(element,index) {return index})', 
	'testobj1.getKeys();', 
	'_().keys(testobj1);',
	'Object.keys(testobj1);',
	'lodash.keys(testobj1);',
	2
);"); // +

$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Väärtuste saamine (getValues)', 
	'$.map(testobj1, function(element,index) {return element})', 
	'testobj1.getValues();', 
	'_.values(testobj1);',
	'Object.values(testobj1);',
	'lodash.values(testobj1);',
	2
);"); // +


// # =========================================================================STRINGS===========================================================================================


$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Stringi pikkuse arvutamine', 
	'$(teststring).length', 
	'', 
	'_.size(teststring);',
	'teststring.length',
	'lodash.size(teststring);',
	3
);"); //+

$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Tühikute kustutamine', 
	'$.trim(teststring);', 
	'', 
	'',
	'teststring.trim();',
	'lodash.trim(teststring);',
	3
);"); //+

$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Stringi sisaldamise kontroll', 
	'', 
	'teststring.contains(searchword);', 
	'',
	'teststring.indexOf(searchword);',
	'lodash.includes(teststring, searchword);',
	3
);"); //+

$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Stringi osa vahetamine', 
	'', 
	'teststring.substitute(searchword, replaceword);', 
	'',
	'teststring.replace(searchword, replaceword);',
	'lodash.replace(teststring, searchword, replaceword);',
	3
);"); //+


$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'CamelCase lause', 
	'', 
	'teststring.camelCase();', 
	'',
	'teststring.replace(/[-\s_|]([a-z])/g, function (g) { return g[1].toUpperCase(); });',
	'lodash.camelCase(teststring);',
	3
);"); //+

$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Suur algustäht', 
	'', 
	'teststring.capitalize();', 
	'',
	'teststring.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
});',
	'lodash.capitalize(teststring);',
	3
);"); //+

$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Reast numbri saamine', 
	'', 
	'stringnumber.toInt();', 
	'',
	'parseInt(stringnumber);',
	'lodash.parseInt(stringnumber);',
	3
);"); //+



# =========================================================================DOM===========================================================================================


$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Identifikaator (Get element by id)', 
	'$(dom_id_whash);', 
	'$$(dom_id_whash);', 
	'_.qsa(dom_id_whash, document);',
	'document.getElementById(dom_id_wohash);',
	'lodash.$(dom_id_whash, document);',
	4
);"); //+


$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Klassi nimi (Get by class)', 
	'$(dom_class_whash);', 
	'$$(dom_class_whash);', 
	'_.qsa(dom_class_whash, document);',
	'document.getElementsByClassName(dom_class_wohash);',
	'lodash.$(dom_class_whash, document);',
	4
);"); //+

$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Atribuut (Get by data attribute)', 
	'$(search_by_data);', 
	'$$(search_by_data);', 
	'_.qsa(search_by_data, document);',
	'document.querySelector(search_by_data);',
	'lodash.$(search_by_data, document);',
	4
);"); //+

$db->query("INSERT OR IGNORE INTO functions (name, jquery, mootools, underscore, native, lodash, group_id) VALUES (
	'Elemendi lapsed (Get children by div id)', 
	'$(dom_id_whash).children();', 
	'$$(dom_id_whash).getChildren();', 
	'_.qsa(dom_id_whash_children, document);',
	'document.getElementById(dom_id_wohash).childNodes;',
	'lodash.$(dom_id_whash, document).siblings();',
	4
);"); //+
