// Search Module :: List Search Results
// Lists Serch Result

function init(app) {
  searchResults = $("#search-results")

  subscribe([
    { id: "brain.thought.search",          handler: onBrainThoughtSearch },
    { id: "brain.thought.search.response", handler: onBrainThoughtSearchResponse }
  ])
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

module.exports = { init: init }
