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
 
    var urlForArticls = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ cityStr + '&sort=newest&api-key=b96c642b11034eabb9d2917c95481709';
    $.getJSON(urlForArticls, function(articles) {})
    .done(function(articles, textStatus, jqXHR){
        if(articles.response.docs.length == 0) {
            $($nytHeaderElem).text('No New York Times Articles About ' + cityStr + ' Today.');
        }
        else {
            $nytHeaderElem.text('New York Times Articles about ' + cityStr); 
        var allArticles = articles.response.docs;
        for(var i = 0, n = allArticles.length; i < n; i++){
            $($nytElem).append('<li class="article"><a href="' + allArticles[i].web_url + '" target="_blank">' + allArticles[i].headline.main + '</a></li>', '<p>' + allArticles[i].snippet + '</p>');
        }
    };
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown.toString());
        $($nytHeaderElem).text('New York Times Articles Could Not Be Loaded');
    });
    
    

   // wiki API
    var urlForWiki = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
    $.ajax({
      url: urlForWiki,
      dataType: 'jsonp',
      // jsonp: 'callback'
      success: function(response){
        console.log("success");
        console.log(response[1]);
        var wikiartikles = response[1];
        if(wikiartikles.length == 0) {
           $('#wikipedia-header').text("No Wikipedia Links For " + cityStr);
        }
        else {
        for (var i = 0, n = wikiartikles.length; i < n; i++){
            var wikiUrl = 'http://en.wikipedia.org/wiki/' + wikiartikles[i];
            $($wikiElem).append('<li><a href="' + wikiUrl + '" target = "_blank">' + wikiartikles[i] + '</a></li>');
        }
        }
      },
      fail: function() {
        console.log("No success");
      }

       

    });



    return false;

};

$('#form-container').submit(loadData);





















