// links Module :: Open Links
// Open thought

function load(mapi) {
  api = mapi

  api.events.subscribe([
    { delegate: "#links", view: ".thought-link", id: "click", handler: onThoughtLinkClick }
  ])

  brain = api.module.request("app:brain.js")
}

function unload(api) {
  api.events.unsubscribe()
}

function onThoughtLinkClick(event) {
  var t   = $(event.target)
  var tid = t.data("thougth-id") ||
            t.closest(".thought-link").data("thougth-id")
  var th  = brain.getThoughtById(tid)
  api.events.notify("brain.thought.select", th)
}

var api
var brain

module.exports = {
  info: {
    id:      "digitalBrain.visual.links.open",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load, unload: unload
}
