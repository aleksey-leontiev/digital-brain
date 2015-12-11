// Search Module :: Open Search Results
// Open thought

function load(mapi) {
  api = mapi

  searchResults = $("#search-results")

  api.events.subscribe([
    { delegate: "#search-results", view: ".search-result", id: "click", handler: onSearchResultClick },
    { id: "brain.thought.search.response", handler: onBrainThoughtSearchResponse }
  ])
}

function unload(api) {
  api.events.unsubscribe()
}

function onSearchResultClick(event) {
  var t   = $(event.target)
  var tid = t.data("thougth-id") ||
            t.parent(".search-result").data("thougth-id")
  api.events.notify("brain.thought.select", thoughts[tid])
}

function onBrainThoughtSearchResponse(query) {
  thoughts = {}

  query.forEach(function(res) {
    thoughts[res.key._id] = res.key
  })
}

var api
var thoughts = {}

module.exports = {
  load: load,
  unload: unload,
  info: {
    id: "digitalBrain.quick.search.open",
    version: "0.1",
    author: "Alexey Leontiev"
  }
}
