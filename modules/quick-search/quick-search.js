// Search Module
// Allows to search thougths

function init(app, config) {
  commitView("view.html", __dirname)

  searchQuery = $("#search-query")

  subscribe([
    { view: "#search-query",  id: "change", handler: onSearchChange },
  ])

  app.modules.loadModules(config.moduleRootPath, [
    "features/highlight",
    "features/list",
    "features/open"
  ], config)
}

function onSearchChange() {
  val = $("#search-query").val().toLowerCase()
  notify("brain.thought.search", { query: val })
}

var searchQuery = null;

module.exports = { init: init }
