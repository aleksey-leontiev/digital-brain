// Search Module :: Highlight Search Results
// Highlights throughts

function init(app) {
  subscribe([
    { id: "brain.open",                    handler: onBrainOpen },
    { id: "brain.thought.search.response", handler: onBrainThoughtSearchResponse },
    { id: "visual.thought.create",         handler: onVisualThoughtCreate }
  ])
}

function onBrainOpen(event) {
  map = {} // New brain open. Clear thought<->node map.
}

function onVisualThoughtCreate(event) {
  map[event.thought._id] = event.node

  event.node.searchHighlight = new Path.Circle({
    radius:    25,
    fillColor: "yellow",
    opacity:   0
  });
  event.node.group.addChild(event.node.searchHighlight);
}

function onBrainThoughtSearchResponse(query) {
  clearSearchResults()

  query.forEach(function(node) {
    highlightNode(map[node.id])
  })
}

function clearSearchResults() {
  lastSearchResults.forEach(function(visualNode) {
    visualNode.searchHighlight.opacity = 0
  })
  lastSearchResults = []
}

function highlightNode(visualNode) {
  if (visualNode == null) return

  lastSearchResults.push(visualNode)
  visualNode.searchHighlight.opacity = 1
}

var lastSearchResults = []
var map = {}

module.exports = { init: init }
