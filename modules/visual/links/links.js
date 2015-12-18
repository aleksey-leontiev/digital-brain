// Visual Module :: Links

function load(api, config) {
  api.module.request("links/features/load.js")
  api.module.request("links/features/create.js")
}

function unload(api) {
  api.events.unsubscribe()
}

module.exports = {
  info: {
    id:          "digitalBrain.visual.links",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "Draw links between nodes"
  },
  load: load, unload: unload
}
