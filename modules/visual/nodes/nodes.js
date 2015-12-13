// Visual Nodes Module

function load(api) {
  api.module.request("nodes/features/create.js")
  api.module.request("nodes/features/drag.js")
  api.module.request("nodes/features/select.js")
  api.module.request("nodes/features/update.js")
  api.module.request("nodes/features/description.js")
  api.module.request("nodes/features/image.js")
}

module.exports = {
  load: load,

  info: {
    id:      "digitalBrain.visual.nodes",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
