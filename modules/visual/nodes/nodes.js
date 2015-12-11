// Visual Nodes Module

function load(api) {
  api.module.request("nodes/features/create")
  api.module.request("nodes/features/drag")
  api.module.request("nodes/features/select")
  api.module.request("nodes/features/update")
  api.module.request("nodes/features/description")
  api.module.request("nodes/features/image")
}

module.exports = {
  load: load,

  info: {
    id:      "digitalBrain.visual.nodes",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
