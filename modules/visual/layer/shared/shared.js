// Visual Module :: Layer :: Shared

function load(api, config) {
  api.events.subscribe([
    { id: "visual.layer",         handler: onVisualLayerRequest },
    { id: "brain.open.completed", handler: onBrainOpenCompleted }
  ])

  shared = api.module.request("shared.js")
}

function unload(api) {
  api.events.unsubscribe()
}

function onBrainOpenCompleted(event) {
  showLayer("nodes:root")
}

function onVisualLayerRequest(layerId) {
  return getLayer(layerId)
}

function getLayer(layerId) {
  if (layers[layerId] == null) {
    var offset = shared.getLayerOffset()
    layers[layerId] = new window.paper.Layer()
    layers[layerId].position.x -= offset.x
    layers[layerId].position.y -= offset.y
  }
  return layers[layerId]
}

function showLayer(layerId) {
  project.layers.forEach(function (l) {
    l.opacity = 0
  })

  if (layers[layerId]) {
    layers[layerId].opacity = 1
    layers[layerId].bringToFront()
  }
}

var layers = {}

module.exports = {
  info: {
    id:      "digitalBrain.visual.layer.shared",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  getLayer: getLayer, showLayer: showLayer,

  load: load, unload: unload
}
