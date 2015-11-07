// Highlight Search Results

function init(app) {
  searchResults = $("#search-results")

  subscribe([
    { id: "brain.thought.find:response", handler: onBrainThoughtFindResponse }
  ])
}

function onBrainThoughtFindResponse(query) {
  clearSearchResults()

  query.forEach(function(res) {
    appendSearchResult(res.key)
  })
}

function clearSearchResults() {
  searchResults.html("")
}

function appendSearchResult(data) {
  searchResults.append(
    "<div>" + (/*data.highlighting.title || */data.title) + "</div>"/* +
    "<p>" + (data.highlighting.description || data.description) + "</p>"*/
  )
}

var searchResults = null

module.exports = { init: init }
