// Link Nodes
// draw links between nodes

function load(api, config) {
  api.module.request("module:layer/features/center.js")
  api.module.request("module:layer/features/move.js")
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
