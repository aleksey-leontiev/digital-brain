// Visual Module :: Layer

function load(api, config) {
  api.module.request("layer/shared.js")
  api.module.request("layer/features/center.js")
  api.module.request("layer/features/move.js")
  api.module.request("layer/features/zoom.js")
}

function unload(api) {
  api.events.unsubscribe()
}

module.exports = {
  info: {
    id:      "digitalBrain.visual.layer",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load, unload: unload
}
