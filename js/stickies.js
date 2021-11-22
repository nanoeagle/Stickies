window.onload = function() {
    showAllExistingStickies();
    document.getElementById("buttonAdd").onclick = createSticky;
}

function showAllExistingStickies() {
    for (var key in localStorage) showStickyIfExistsAt(key);
}

function showStickyIfExistsAt(key) {
    if (key.startsWith("sticky_", 0)) {
        var stickyText = localStorage[key];
        addStickyToDomWith(stickyText);
    }
}

function addStickyToDomWith(stickyText) {
    var sticky = document.createElement("li");
    sticky.className = "sticky";
    sticky.innerHTML = stickyText;
    document.getElementById("stickies").appendChild(sticky);
}

function createSticky() {
    var stickyText = document.getElementById("stickyText").value;
    var key = "sticky_" + localStorage.length;
    localStorage.setItem(key, stickyText);
    addStickyToDomWith(stickyText);
}