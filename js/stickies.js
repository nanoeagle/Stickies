window.onload = showAllExistingStickies;

function showAllExistingStickies() {
    for (var i = 0; i < localStorage.length; i++) {
        showStickyIfExistsAtIndex(i);
    }
}

function showStickyIfExistsAtIndex(index) {
    var key = localStorage.key(index);
    if (key.startsWith("sticky", 0)) {
        var stickyValue = localStorage[key];
        addStickyToDomWith(stickyValue);
    }
}

function addStickyToDomWith(stickyValue) {
    var sticky = document.createElement("li");
    sticky.className = "sticky";
    sticky.innerHTML = stickyValue;
    document.getElementById("stickies").appendChild(sticky);
}