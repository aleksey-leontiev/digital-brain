// Highlight Selected
// highlights selected thought

function load(api, config) {
  api.events.subscribe([
    { id: "brain.thought.select",  handler: onBrainThoughtSelect },
    { id: "visual.thought.select", handler: onVisualThoughtSelect },
    { id: "visual.thought.create", handler: onVisualThoughtCreate },
    { id: "visual.frame",          handler: onVisualFrame }
  ])

  shared = api.module.request("shared", config)
}

function unload(api) {
  api.events.unsubscribe()
}

function onBrainThoughtSelect(event) {
  clearSelection()
  selectedVisualNode = shared.getVisualNodeByThoughtId(event._id)
  highlightNode(selectedVisualNode)
}

function onVisualThoughtCreate(event) {
  event.node.selectionHighlight = new Path.Circle({
    radius: 50,
    fillColor: "yellow",
    opacity: 0
  })
  event.node.selectionHighlight.style = {
    strokeColor: 'red',
    dashArray: [15,25],
    strokeWidth: 4,
    strokeCap: 'round'
  }
  event.node.group.addChild(event.node.selectionHighlight)
}

function onVisualThoughtSelect(node) {
  clearSelection()
  selectedVisualNode = node
  highlightNode(node)
}

function onVisualFrame() {
  if (selectedVisualNode != null)
    selectedVisualNode.selectionHighlight.rotate(1)
}

function clearSelection() {
  if (selectedVisualNode != null)
    selectedVisualNode.selectionHighlight.opacity = 0
}

function highlightNode(node) {
  node.selectionHighlight.opacity = .2
}

var selectedVisualNode = null

module.exports = {
  load: load, unload: unload,

  info: {
    id:      "digitalBrain.visual.nodes.select",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
