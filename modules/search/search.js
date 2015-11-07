// Search Module
// shows details of selected thought

function init(app) {
  commitView("modules/search/view.html", "Search")

  searchQuery = $("#search-query")

  subscribe([
    { view: "#search-query",  id: "change", handler: onSearchChange },
  ])
}

function onSearchChange() {
  val = $("#search-query").val().toLowerCase()
  notify("brain.thought.find", { query: val })
}

var searchQuery = null;

module.exports = { init: init }
