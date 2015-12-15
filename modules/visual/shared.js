// Shared Library

function load(api) {
  api.events.subscribe([
    { id: "visual.layer.moved", handler: onVisualLayerMoved }
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
  getLayerOffset: function () { return layerOffset }
}
