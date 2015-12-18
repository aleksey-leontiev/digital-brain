// Visual Module :: Layer

function load(api, config) {
  api.module.request("layer/shared")
  api.module.request("layer/features/center.js")
  api.module.request("layer/features/move.js")
  api.module.request("layer/features/zoom.js")
}

function unload(api) {
  api.module.unload("digitalBrain.visual.layer.center")
  api.module.unload("digitalBrain.visual.layer.move")
  api.module.unload("digitalBrain.visual.layer.zoom")

}

module.exports = {
  info: {
    id:      "digitalBrain.visual.layer",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load, unload: unload
}
