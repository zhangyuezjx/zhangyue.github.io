var searchBtn = document.querySelector('.search-icon');
var searInput = document.querySelector('.search-input');
var xhr = new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');
xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200) {
        xml = xhr.responseXML;
        console.log(xml);
    }
}
xhr.open('get', '/feed.xml', true);
xhr.send();
