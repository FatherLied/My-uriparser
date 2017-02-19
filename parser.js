var form = document.getElementById('url-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    var uri = document.getElementById('uri-box').value;
    var uriParts = parseUri(uri);
    render(uriParts);
});

function render(uriParts) {
    document.getElementById('parts').className = '';
    for (var key in uriParts) {
        document.getElementById(key + '-value').innerHTML = uriParts[key];
    }
}

function parseUri(uri) {
    var uriParts = {
        scheme: '',
        authority: '',
        path: '',
        query: '',
        fragment: ''
    };

    var schemeEndIndex = uri.indexOf("://");

    if(schemeEndIndex < 0){
        uriParts.scheme = uri;
        return uriParts;
    }

    uriParts.scheme = uri.substring(0, (schemeEndIndex) );
    uri = uri.substring((schemeEndIndex + 3) , (uri.length));
    
    var fragmentStartIndex = uri.indexOf("#");

    if(fragmentStartIndex >= 0){
        uriParts.fragment = uri.substring((fragmentStartIndex + 1),uri.length);
        uri = uri.substring(0,fragmentStartIndex);
    }

    var queryStartIndex = uri.indexOf("?");

    if(queryStartIndex >= 0){
        uriParts.fragment = uri.substring((queryStartIndex + 1),uri.length);
        uri = uri.substring(0,queryStartIndex);
    }

    var pathStartIndex = uri.indexOf("/");

    if(pathStartIndex >= 0){
        uriParts.path = uri.substring(pathStartIndex, uri.length);
        uri = uri.substring(0,pathStartIndex);
    }

    uriParts.authority = uri;

    return uriParts;
}