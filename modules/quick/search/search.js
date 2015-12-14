// Quick Search Module
// Allows to search thougths

function load(mapi) {
  api = mapi

  view = {
    root:   api.views.commitToPanel("assets/view.html", {
              t: api.l10n.get("assets/translation.json") }),
    search: $("#search-query")
  }

  api.events.subscribe([
    { view: "#search-query",  id: "change", handler: onSearchChange },
  ])

  api.module.request("features/highlight.js")
  api.module.request("features/list.js")
  api.module.request("features/open.js")
}

function unload(api) {
  api.events.unsubscribe()
  view.root.remove()
}

function onSearchChange() {
  val = view.search.val().toLowerCase()
  api.events.notify("brain.thought.search", { query: val })
}

var api
var view;

module.exports = {
  load: load,
  unload: unload,
  info: {
    id:         "digitalBrain.quick.search",
    name:       "Quick Search",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "Allows to search thougths"
  }
}
