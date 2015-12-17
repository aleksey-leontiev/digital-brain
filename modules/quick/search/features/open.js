// Quick Search Module :: Open Search Results

function load(mapi) {
  api = mapi

  api.events.subscribe([
    { delegate: "#search-results", view: ".search-result", id: "click", handler: onSearchResultClick },
  ])

  brain = api.module.request("app:brain.js")
}

function unload(api) {
  api.events.unsubscribe()
}

function onSearchResultClick(event) {
  var t   = $(event.target)
  var tid = t.data("thougth-id") ||
            t.parent(".search-result").data("thougth-id")
  var th  = brain.getThoughtById(tid)
  api.events.notify("brain.thought.select", th)
}

var api
var brain

module.exports = {
  info: {
    id: "digitalBrain.quick.search.open",
    version: "0.1",
    author: "Alexey Leontiev"
  },

  load: load, unload: unload,
}
