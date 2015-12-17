// Quick Search Module :: List Search Results

function load(api) {
  view = {
    results: $("#search-results"),
    card:    api.views.template("assets/card.html")
  }

  api.events.subscribe([
    { id: "brain.thought.search",          handler: onBrainThoughtSearch },
    { id: "brain.thought.search.response", handler: onBrainThoughtSearchResponse }
  ])
}

function unload(api) {
  api.events.unsubscribe()
}

function onBrainThoughtSearch(event) {
  clearSearchResults()
}

function onBrainThoughtSearchResponse(query) {
  query.forEach(function(res) {
    appendSearchResult(res.key)
  })
}

function clearSearchResults() {
  view.results.html("")
}

function appendSearchResult(thought) {
  var html = view.card({thought: thought})
  view.results.append(html)
}

var view = {}

module.exports = {
  info: {
    id: "digitalBrain.quick.search.list",
    version: "0.1",
    author: "Alexey Leontiev"
  },

  load: load, unload: unload
}
