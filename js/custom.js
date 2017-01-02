window.compareAlternatives = function (description, fn) {
  if (fn != '') {
    var fn = new Function(fn)
    // if (fn) return;

    parent.benchmarkSuites.add(window.frameElement.id, fn, { description: description });
  }
}


lodash = _.noConflict();

// Seed data

function inc(x) { return x + 1; }
function dec(x) { return x - 1; }
function square(x) { return x * x; }
function identity(x) { return x; }
function isEven(x) { return x % 2 == 0; }
function arr(amount) { return lodash.times(amount, Number); }



var array1 = arr(5);
var array2 = arr(5);

var testobj1 = { 'name': 'Peter', 'age': 25, 'gender': 'male' };
var testobj2 = { 'name': 'Christina', 'age': 21, 'gender': 'female' };
var testobj_array = [testobj1, testobj2];
var array_of_arrays = [[array1], [array2]];
var teststring = "The quick brown fox jumps over the lazy dog";

var dom_id_whash = "#parent";
var dom_id_whash_children = "#parent div";
var dom_id_wohash = "parent";

var dom_class_whash = ".child";
var dom_class_wohash = "child";
var search_by_data = "#parent .child[data-search='parent']";

var searchword = "fox";
var replaceword = "animal";
var searchkey = "name";

var stringnumber = '07';