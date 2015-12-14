// Visual Nodes Module

function load(api) {
  meta = api.module.request("app:meta.js")
  api.module.request("nodes/features/create.js")
  api.module.request("nodes/features/drag.js")
  api.module.request("nodes/features/select.js")
  api.module.request("nodes/features/update.js")
  api.module.request("nodes/features/description.js")
  api.module.request("nodes/features/image.js")

  api.events.subscribe([
    { id: "visual.get", handler: onVisualGet }
  ])
}

function onVisualGet(thoughtId) {
  return meta.get(thoughtId, "visual")
}

var meta

module.exports = {
  load: load,

  info: {
    id:      "digitalBrain.visual.nodes",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
