// Search Module :: List Search Results
// Lists Serch Result

function load(api) {
  searchResults = $("#search-results")

  api.events.subscribe([
    { id: "brain.thought.search",          handler: onBrainThoughtSearch },
    { id: "brain.thought.search.response", handler: onBrainThoughtSearchResponse }
  ])
}

function unload(api) {
  api.events.unsubscribe()
}

function onBrainThoughtSearch(event) {
  clearSearchResults
}

function onBrainThoughtSearchResponse(query) {
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
    getSearchResultView(data._id, data.title, data.description)
  )
}

function getSearchResultView(id, title, description) {
  return  "<div class='search-result uk-panel uk-panel-hover' data-thougth-id='" +id+ "'>" +
          "  <h3 class='uk-panel-title'>" + title + "</h3>" +
          "  " + description +
          "</div>"
}

var searchResults = null

module.exports = {
  load: load,
  unload: unload,
  info: {
    id: "digitalBrain.quick.search.list",
    version: "0.1",
    author: "Alexey Leontiev"
  }
}
