
var active_tab = $('.tab.active').data('tab');
$('.menu .item').tab({'onVisible':function(){ active_tab = $(this).data('tab'); }});


var library_list = [];
$("iframe").each(function(){ library_list.push(this.id); });

$('.popup-ui')
  .popup({
    inline: true
  })
;

lodash = _.noConflict();

Benchmark.options.maxTime = 5;

var benchmarkSuites;

$('#benchmark').on('click', function(e){

	benchmarkSuites = createBenchmarkSuite();

	if ($('#benchmark').hasClass('loading'))
		e.stopPropagation();

	$('.benchmark-result').text("");
	$('#benchmark').addClass('loading');

	var active_tab = $('.tab.active').data('tab');
	if (active_tab == 'predefined_functions') {
		$( "div[data-tab='predefined_functions'] tbody tr" ).each(function( index ) {
			var row = $(this);

			library_list.forEach(function(library) {
				var iframe = document.getElementById(library).contentWindow;

				var function_content = row.find('td[data-name='+library+']').data('function');
				iframe.compareAlternatives(row.find('td:first').text(), function_content);
			});


		});

	} else if (active_tab == 'custom_code') {
		$('.custom-code-block').each(function(){
			var block = $(this);

			var name = block.find('.name');
			var block_id = block.data('id');
			var library = block.find('.library').val();
			var code = block.find('.code');

			// try {
			//     (function(){
			//         eval(code.val());
			//     })()
			// }
			// catch(e) {
			//     code.parent('.field').addClass('error');
			//     return false;
			// }

			console.log(library)
			var iframe = document.getElementById(library).contentWindow;
			iframe.compareAlternatives(block.attr('data-id'), code.val());

		});


	}

	benchmarkSuites.run({ async: true });

});


function createBenchmarkSuite() {
  var suite = new Benchmark.Suite();


	
	suite.on('complete', function() {
		console.log(benchmarkSuites.reset());
	  resetState();
	  // console.log('Fastest is ' + this.filter('fastest').map('name'));
	})

	suite.on('cycle', function(event) {

	  $('#progress-bar').progress('increment');

	  if (active_tab == "predefined_functions") {
	    var row = $('tr[data-name="'+event.target.description+'"]')
	    row.find('td[data-name="'+event.target.name+'"] .benchmark-result').text(Benchmark.formatNumber(event.target.hz.toFixed(event.target.hz < 100 ? 2 : 0)) + ' ops/s ');
	  } else {
	  	console.log(event.target);
	  	var block = $('.custom-code-block[data-id='+event.target.description+']');
	    block.find('.custom-result').text(Benchmark.formatNumber(event.target.hz.toFixed(event.target.hz < 100 ? 2 : 0)) + ' ops/s ');
	  }

	  setTimeout(100);

	})

  return suite;
}

function resetState() {
	$('#benchmark').removeClass('loading');
}

// Template
var custom_template = lodash.template('<div class="field custom-code-block" data-id="<%= index %>"> \
	<div class="ui grid"> \
	<div class="ui twelve wide column"><b>Testing code <%= index %></b></div> \
	<div class="ui four wide column custom-result" style="font-weight: bold;"></div></div> \
	<p><ui class="two fields"><div class="field"><label>Name</label><input class="name" type="text" placeholder="Name"></div> \
	<div class="field"><label>Include library</label><select class="ui dropdown library"> \
	<option value="native">None</option> \
	<option value="jquery">jQuery</option> \
	<option value="underscore">Underscore</option> \
	<option value="mootools">MooTools</option> \
	<option value="lodash">loDash</option></select></div> \
	<div class="field"><label>Code</label><textarea class="code"></textarea></div></div></p>\
	</div>');
$('#custom_code_form').append(custom_template({"index": "1"}));

$('#add_new_function').on('click', function(){
	$('#custom_code_form').append(custom_template({"index": $('[data-id]').length + 1}));
});
