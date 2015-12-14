// Quick Search Module :: Highlight Search Results

function load(api) {
  api.events.subscribe([
    { id: "brain.open",                    handler: onBrainOpen },
    { id: "brain.thought.search.response", handler: onBrainThoughtSearchResponse },
    { id: "visual.thought.create",         handler: onVisualThoughtCreate }
  ])
}

function unload(api) {
  api.events.unsubscribe()
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

module.exports = {
  info: {
    id: "digitalBrain.quick.search.highlight",
    version: "0.1",
    author: "Alexey Leontiev"
  },
  load: load,  unload: unload,
}
