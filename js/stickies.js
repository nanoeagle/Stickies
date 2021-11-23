window.onload = function() {
    document.getElementById("buttonAdd").onclick = createSticky;
    showAllExistingStickies();
}

function createSticky() {
    var key = "sticky_" + (new Date()).getTime();
    addNewKeyToStickyKeyArray(key);

    var stickyText = document.getElementById("stickyText").value;
    localStorage[key] = stickyText;
    addStickyToDom(stickyText);
}

function addNewKeyToStickyKeyArray(key) {
    var stickyKeyArray = getStickyKeyArray();
    stickyKeyArray.push(key);
    localStorage["stickyKeyArray"] = JSON.stringify(stickyKeyArray);
}

function showAllExistingStickies() {
    var stickyKeyArray = getStickyKeyArray();
    for (var key of stickyKeyArray) showStickyMappedFrom(key);
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

function showStickyMappedFrom(key) {
    var stickyText = localStorage[key];
    addStickyToDom(stickyText);
}

function addStickyToDom(stickyText) {
    var sticky = document.createElement("li");
    sticky.className = "sticky";
    sticky.innerHTML = stickyText;
    document.getElementById("stickies").appendChild(sticky);
}