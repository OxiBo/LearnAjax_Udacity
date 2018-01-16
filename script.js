
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('input#street').val();
    var cityStr = $('input#city').val();
    var address = streetStr + ', ' + cityStr;
    $greeting.text('So, you want to live at' + address + '?');

    var streetviewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + 
    address + '';
    $body.append('<img class="bgimg" src="' + streetviewURL + '">');


    return false;
};

$('#form-container').submit(loadData);