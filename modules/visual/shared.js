// Shared Library

function load(api) {
  api.events.subscribe([
    { id: "visual.layer.moved",     handler: onVisualLayerMoved },
    { id: "visual.thought.created", handler: onVisualThoughtCreated }
  ])

  meta = api.module.request("app:meta.js")
}

function unload(api) {
  api.events.unsubscribe()
}

function getVisualNode(id) {
  return meta.get(id, "visual")
}

function onVisualLayerMoved(event) {
  layerOffset = event.offset
}

function onVisualThoughtCreated(event) {
  nodes.push(event.node)
}

function getNodes() {
  return nodes
}

var nodes = []
var layerOffset = { x:0, y:0 }
var meta


module.exports = {
  info: {
    id:      "digitalBrain.visual.shared",
    version: "0.1",
    author:  "Alexey Leontiev"
  },
  load:   load,
  unload: unload,
  getVisualNode: getVisualNode,
  getNodes: getNodes,
  getLayerOffset: function () { return layerOffset }
}
