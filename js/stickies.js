window.onload = function () {
    document.getElementById("stickyText").onkeydown = handleKeyPressInStickyText;
    document.getElementById("buttonAdd").onclick = createSticky;
    document.getElementById("buttonClear").onclick = clearAllStickies;
    showAllExistingStickies();
};

function showAllExistingStickies() {
    var stickyKeyArray = getStickyKeyArray();
    for (var stickyKey of stickyKeyArray) showStickyMappedFrom(stickyKey);
}

function getStickyKeyArray() {
    var stickyKeyArray = localStorage["stickyKeyArray"];
    if (stickyKeyArray) stickyKeyArray = JSON.parse(stickyKeyArray);
    else stickyKeyArray = createStickyKeyArray();
    return stickyKeyArray;
}

function createStickyKeyArray() {
    var stickyKeyArray = [];
    localStorage["stickyKeyArray"] = JSON.stringify(stickyKeyArray);
    return stickyKeyArray;
}

function showStickyMappedFrom(stickyKey) {
    var sticky = JSON.parse(localStorage[stickyKey]);
    addStickyToDom(stickyKey, sticky);
}

function addStickyToDom(stickyKey, sticky) {
    var stickies = document.getElementById("stickies");
    var stickyElement = createStickyElement(stickyKey, sticky);
    stickies.insertBefore(stickyElement, stickies.firstChild);
}

function createStickyElement(stickyKey, sticky) {
    var stickyElement = document.createElement("li");
    stickyElement.id = stickyKey;
    stickyElement.className = "sticky";
    stickyElement.innerHTML = sticky.text;
    stickyElement.style.backgroundColor = sticky.color;
    stickyElement.onclick = deleteStickyIfConfirmed;
    return stickyElement;
}