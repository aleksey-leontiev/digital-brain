// Quick Search Module :: Highlight Search Results

function load(mapi) {
  api = mapi

  api.events.subscribe([
    { id: "brain.thought.search.response", handler: onBrainThoughtSearchResponse },
    { id: "visual.thought.create",         handler: onVisualThoughtCreate }
  ])

  brain = api.module.request("app:brain.js")
  meta  = api.module.request("app:meta.js")
}

function unload(api) {
  api.events.unsubscribe()

  // remove search highlight node
  brain.getThoughtsArray().forEach(function (thought) {
    var node = meta.get(thought._id, "visual")
    if (node) node.searchHighlight.remove()
  })
}

function onVisualThoughtCreate(event) {
  event.node.searchHighlight = new Path.Circle({
    radius:    25,
    fillColor: "yellow",
    opacity:   0
  });
  event.node.root.addChild(event.node.searchHighlight);
}

function onBrainThoughtSearchResponse(query) {
  clearSearchResults()

  query.forEach(function(node) {
    var visualNode = api.events.request("visual.get", node.id)
    highlightNode(visualNode)
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

var api
var shared
var brain
var lastSearchResults = []

module.exports = {
  info: {
    id: "digitalBrain.quick.search.highlight",
    version: "0.1",
    author: "Alexey Leontiev"
  },
  load: load,  unload: unload,
}
