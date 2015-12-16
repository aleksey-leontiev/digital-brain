// Highlight Selected
// highlights selected thought

function load(api) {
  api.events.subscribe([
    { id: "brain.thought.select",  handler: onBrainThoughtSelect },
    { id: "visual.thought.select", handler: onVisualThoughtSelect },
    { id: "visual.thought.create", handler: onVisualThoughtCreate },
    { id: "visual.frame",          handler: onVisualFrame }
  ])

  shared = api.module.request("shared.js")
}

function unload(api) {
  api.events.unsubscribe()

  // remove all image nodes
  shared.getNodes().forEach(function (node) {
    removeSelectionHighlight(node)
  })
}

function onBrainThoughtSelect(event) {
  clearSelection()
  selectedNode = shared.getVisualNode(event._id)
  highlightNode(selectedNode)
}

function onVisualThoughtCreate(event) {
  createSelectionHighlight(event.node)
}

function onVisualThoughtSelect(node) {
  clearSelection()
  selectedNode = node
  highlightNode(node)
}

function onVisualFrame() {
  if (selectedNode != null)
    selectedNode.selectionHighlight.rotate(1)
}

function clearSelection() {
  if (selectedNode != null)
    selectedNode.selectionHighlight.opacity = 0
}

function highlightNode(node) {
  node.selectionHighlight.opacity = .2
}

function createSelectionHighlight(node) {
  node.selectionHighlight = new Path.Circle({
    radius:      25,
    dashArray:   [15],
    fillColor:   "yellow",
    strokeColor: "red",
    strokeCap:   "round",
    strokeWidth: 4,
    opacity:     0,
  })
  node.group.addChild(node.selectionHighlight)
}

function removeSelectionHighlight(node) {
  node.selectionHighlight.remove()
}

var brain
var selectedNode = null

module.exports = {
  load: load, unload: unload,

  info: {
    id:      "digitalBrain.visual.nodes.select",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
