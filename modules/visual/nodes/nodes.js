// Visual Nodes Module

function load(api, config) {
  api.module.request("nodes/features/create", config)
  api.module.request("nodes/features/drag", config)
  api.module.request("nodes/features/select", config)
  api.module.request("nodes/features/update", config)
  api.module.request("nodes/features/description", config)
  api.module.request("nodes/features/image", config)
}

module.exports = {
  load: load,

  info: {
    id:      "digitalBrain.visual.nodes",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
