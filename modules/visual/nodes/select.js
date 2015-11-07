// Highlight Selected
// highlights selected thought

function init(app) {
  subscribe([
    { id: "visual.thought.select", handler: onVisualThoughtSelect },
    { id: "visual.thought.create", handler: onVisualThoughtCreate },
    { id: "visual.frame",          handler: onVisualFrame }
  ])
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

module.exports = { init: init }
