// Visual Layer Module

function load(api, config) {
  api.module.request("module:layer/features/center.js")
  api.module.request("module:layer/features/move.js")

  api.events.subscribe([
    { id: "visual.layer", handler: onVisualLayerRequest }
  ])
}

function unload(api) {
  api.events.unsubscribe()
}

function onVisualLayerRequest(layerId) {
  if (layers[layerId] == null) {
    layers[layerId] = new window.paper.Layer()
  }
  return layers[layerId]
}

var layers = {}

module.exports = {
  info: {
    id:      "digitalBrain.visual.layer",
    version: "0.1",
    author:  "Alexey Leontiev"
  },
  load: load, unload: unload
}
