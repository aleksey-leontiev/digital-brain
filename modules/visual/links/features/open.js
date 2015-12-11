// links Module :: Open Links
// Open thought

function load(mapi) {
  api = mapi

  searchResults = $("#links")

  api.events.subscribe([
    { delegate: "#links", view: ".thought-link", id: "click", handler: onThoughtLinkClick }
  ])

  shared = api.module.request("shared")
}

function unload(api) {
  api.events.unsubscribe()
}

function onThoughtLinkClick(event) {
  var t   = $(event.target)
  var tid = t.data("thougth-id") ||
            t.closest(".thought-link").data("thougth-id")
  api.events.notify("brain.thought.select", shared.getThoughtById(tid))
}

var api
var shared = null

module.exports = {
  info: {
    id:      "digitalBrain.visual.links.open",
    version: "0.1",
    author:  "Alexey Leontiev"
  },
  load: load, unload: unload
}
