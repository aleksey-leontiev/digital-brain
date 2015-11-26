// Search Module
// Allows to search thougths

function load(mapi, config) {
  api = mapi

  view = {
    root:        api.views.commitToPanel("view.html"),
    searchQuery: $("#search-query"),
  }

  api.events.subscribe([
    { view: "#search-query",  id: "change", handler: onSearchChange },
  ])

  api.module.request("features/highlight")
  api.module.request("features/list")
  api.module.request("features/open")
}

function unload(api) {
  api.events.unsubscribe()
  view.root.remove()
}

function onSearchChange() {
  val = view.searchQuery.val().toLowerCase()
  api.events.notify("brain.thought.search", { query: val })
}

var api
var view;

module.exports = {
  load: load,
  unload: unload,
  info: {
    id: "digitalBrain.quick.search",
    version: "0.1",
    author: "Alexey Leontiev",
    description: "Allows to search thougths"
  }
}
