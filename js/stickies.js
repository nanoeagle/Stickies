window.onload = function () {
    document.getElementById("buttonAdd").onclick = createSticky;
    document.getElementById("buttonClear").onclick = clearAllStickies;
    showAllExistingStickies();
};

function createSticky() {
    var stickyKey = "sticky_" + (new Date()).getTime();
    var sticky = {
        text: document.getElementById("stickyText").value,
        color: document.getElementById("stickyColor").value
    };
    addNewKeyToStickyKeyArray(stickyKey);
    try {
        localStorage[stickyKey] = JSON.stringify(sticky);
        addStickyToDom(stickyKey, sticky);
    } catch (error) {
        alert(error);
    }
}

function clearAllStickies() {
    localStorage.clear();
    clearAllStickiesFromDom();
}

function clearAllStickiesFromDom() {
    var stickies = document.getElementById("stickies");
    while (stickies.hasChildNodes())
        stickies.removeChild(stickies.firstChild);
}

function addNewKeyToStickyKeyArray(stickyKey) {
    var stickyKeyArray = getStickyKeyArray();
    stickyKeyArray.push(stickyKey);
    try {
        localStorage["stickyKeyArray"] = JSON.stringify(stickyKeyArray);
    } catch (error) {
        alert(error);
    }
}

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