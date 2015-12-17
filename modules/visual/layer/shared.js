// Visual Module :: Layer :: Shared

function load(api, config) {
  api.events.subscribe([
    { id: "visual.layer",         handler: onVisualLayerRequest },
    { id: "brain.open.completed", handler: onBrainOpenCompleted }
  ])
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
    layers[layerId] = new window.paper.Layer()
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
