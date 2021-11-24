window.onload = function() {
    document.getElementById("buttonAdd").onclick = createSticky;
    showAllExistingStickies();
}

function createSticky() {
    var stickyKey = "sticky_" + (new Date()).getTime();
    addNewKeyToStickyKeyArray(stickyKey);

    var stickyText = document.getElementById("stickyText").value;
    localStorage[stickyKey] = stickyText;
    addStickyToDom(stickyKey, stickyText);
}

function addNewKeyToStickyKeyArray(stickyKey) {
    var stickyKeyArray = getStickyKeyArray();
    stickyKeyArray.push(stickyKey);
    localStorage["stickyKeyArray"] = JSON.stringify(stickyKeyArray);
}

function showAllExistingStickies() {
    var stickyKeyArray = getStickyKeyArray();
    for (var stickyKey of stickyKeyArray) showStickyMappedFrom(stickyKey);
}

function getStickyKeyArray() {
    var stickyKeyArray = localStorage["stickyKeyArray"];
    if (stickyKeyArray) {
        stickyKeyArray = JSON.parse(stickyKeyArray);
    } else 
        stickyKeyArray = createStickyKeyArray();
    return stickyKeyArray;
}

function createStickyKeyArray() {
    var stickyKeyArray = [];
    localStorage["stickyKeyArray"] = JSON.stringify(stickyKeyArray);
    return stickyKeyArray;
}

function showStickyMappedFrom(stickyKey) {
    var stickyText = localStorage[stickyKey];
    addStickyToDom(stickyKey, stickyText);
}

function addStickyToDom(stickyKey, stickyText) {
    var sticky = document.createElement("li");
    sticky.id = stickyKey;
    sticky.className = "sticky";
    sticky.innerHTML = stickyText;
    sticky.onclick = deleteStickyIfConfirmed;
    document.getElementById("stickies").appendChild(sticky);
}

function deleteStickyIfConfirmed(event) {
    if (window.confirm("DELETE this sticky?")) {
        var stickyKey = event.target.id;
        localStorage.removeItem(stickyKey);
        deleteStickyKey(stickyKey);
        deleteStickyFromDOM(stickyKey);
    }
}

function deleteStickyKey(stickyKey) {
    var stickyKeyArray = getStickyKeyArray();
    stickyKeyArray.splice(stickyKeyArray.indexOf(stickyKey), 1);
    localStorage["stickyKeyArray"] = JSON.stringify(stickyKeyArray);
}

function deleteStickyFromDOM(stickyKey) {
    var sticky = document.getElementById(stickyKey);
    sticky.parentElement.removeChild(sticky);
}