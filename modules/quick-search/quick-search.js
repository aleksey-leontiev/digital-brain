// Search Module
// Allows to search thougths

function init(app) {
  commitView("modules/quick-search/view.html")

  searchQuery = $("#search-query")

  subscribe([
    { view: "#search-query",  id: "change", handler: onSearchChange },
  ])

  var path = __dirname + "/features/"
  loadModule("highlight", path)
  loadModule("list",      path)
  loadModule("open",      path)
}

function onSearchChange() {
  val = $("#search-query").val().toLowerCase()
  notify("brain.thought.search", { query: val })
}

var searchQuery = null;

module.exports = { init: init }
