function createSticky() {
    var stickyKey = "sticky_" + (new Date()).getTime();
    var sticky = {
        text: document.getElementById("stickyText").value,
        color: document.getElementById("stickyColor").value
    };
    try {
        localStorage[stickyKey] = JSON.stringify(sticky);
        addNewKeyToStickyKeyArray(stickyKey);
        addStickyToDom(stickyKey, sticky);
        refreshStickyTextBox();
    } catch (error) {
        localStorage.removeItem(stickyKey);
        alert(error);
    }
}

function addNewKeyToStickyKeyArray(stickyKey) {
    var stickyKeyArray = getStickyKeyArray();
    stickyKeyArray.push(stickyKey);
    localStorage["stickyKeyArray"] = JSON.stringify(stickyKeyArray);
}

function refreshStickyTextBox() {
    var stickyText = document.getElementById("stickyText");
    stickyText.focus();
    stickyText.value = "";
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