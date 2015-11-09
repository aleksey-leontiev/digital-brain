// Search Module :: Open Search Results
// Open thought

function init(app) {
  searchResults = $("#search-results")

  subscribe([
    { delegate: "#search-results", view: ".search-result", id: "click", handler: onSearchResultClick },
    { id: "brain.thought.search.response", handler: onBrainThoughtSearchResponse }
  ])
}

function onSearchResultClick(event) {
  var t   = $(event.target)
  var tid = t.data("thougth-id") ||
            t.parent(".search-result").data("thougth-id")
  notify("brain.thought.select", thoughts[tid])
}

function onBrainThoughtSearchResponse(query) {
  thoughts = {}

  query.forEach(function(res) {
    thoughts[res.key._id] = res.key
  })
}

var thoughts = {}

module.exports = { init: init }
