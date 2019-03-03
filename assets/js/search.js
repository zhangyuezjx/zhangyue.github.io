var searchBtn = document.querySelector('.search-icon');
var searchInput = document.querySelector('.search-input');
var searchResults = document.querySelector('.search-results');
var searchValue = '',
    arrItems = [],
    arrContents = [],
    arrLinks = [],
    arrTitles = [],
    arrResults = [];
    indexItem = [];
var tmpDiv = document.createElement('div');
tmpDiv.className = 'result-item';

var xhr = new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');
xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200) {
        xml = xhr.responseXML;
        arrItems = xml.getElementsByTagName('item');
        for (i = 0; i < arrItems.length; i++) {
            arrContents[i] = arrItems[i].getElementsByTagName('description')[0].childNodes[0].nodeValue;
            arrLinks[i] = arrItems[i].getElementsByTagName('link')[0].childNodes[0].nodeValue.replace(/\s+/g, '');
            arrTitles[i] = arrItems[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
        }
    }
}
xhr.open('get', '/feed.xml', true);
xhr.send();

searchBtn.onclick = searchConfirm;
searchInput.onkeydown = function(evt){
    if (evt.keyCode == '13') searchConfirm();
}

function searchConfirm() {
    if (searchInput.value == '' || searchInput.value.search(/^\s+$/) >= 0) {
        // console.log(false);
    } else {
        console.log(true);
        clearData();
        searchValue = searchInput.value;
        searchMatching(arrContents, searchValue);
    }
}

function clearData() {
    arrResults = [];
    indexItem = [];
    searchResults.innerHTML = '';
}

function searchMatching(matchArr, matchInput) {
    for (i = 0; i < matchArr.length; i++) {
        if (matchArr[i].search(matchInput) >= 0) {
            indexItem.push(i);
            var indexContent = matchArr[i].search(matchInput);
            var l = matchInput.length;
            arrResults.push(matchArr[0].slice(indexContent - 10, indexContent + l + 10));
        }
    }
    if (indexItem.length == 0) {
        console.log('no matching');
        var itemDiv = tmpDiv.cloneNode(true);
        itemDiv.innerText = 'no matching';
        searchResults.appendChild(itemDiv);
    }
    for (i = 0, j = 0; i < arrResults.length, j < indexItem.length; i++, j++) {
        var itemDiv = tmpDiv.cloneNode(true);
        itemDiv.innerHTML = '<b>' + indexItem[i] + '</b> <br />' + arrResults[i];
        itemDiv.setAttribute('onclick', 'changeHref(arrLinks[indexItem[' + i + ']])');
        searchResults.appendChild(itemDiv);
    }
}

function changeHref(href) {
    location.href = href;
}