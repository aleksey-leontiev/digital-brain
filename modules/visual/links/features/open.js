// links Module :: Open Links
// Open thought

function init(app, config) {
  searchResults = $("#links")

  subscribe([
    { delegate: "#links", view: ".thought-link", id: "click", handler: onThoughtLinkClick }
  ])

  var modules = app.modules.loadModules(config.moduleRootPath, [
    "shared"
  ], config)
  shared = modules[0]
}

function onThoughtLinkClick(event) {
  var t   = $(event.target)
  var tid = t.data("thougth-id") ||
            t.parent(".thought-link").data("thougth-id")
  notify("brain.thought.select", shared.getThoughtById(tid))
}

var shared = null

module.exports = { init: init }
