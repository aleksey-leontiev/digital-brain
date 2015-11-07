// Highlight Search Results Module

function init(app) {
  subscribe([
    { id: "brain.thought.find:response", handler: onBrainThoughtFindResponse },
    { id: "visual.thought.create",       handler: onVisualThoughtCreate }
  ])
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

function onBrainThoughtFindResponse(query) {
  clearSearchResults()

  query.forEach(function(node) {
    highlightNode(map[node.id])
  })
}

function clearSearchResults() {
  lastSearchResults.forEach(function(node) {
    node.searchHighlight.opacity = 0
  })
  lastSearchResults = []
}

function highlightNode(visual) {
  if (visual == null) return

  lastSearchResults.push(visual)
  visual.searchHighlight.opacity = 1
}

var lastSearchResults = []
var map = {}

module.exports = { init: init }
