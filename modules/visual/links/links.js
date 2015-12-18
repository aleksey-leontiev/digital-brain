// Visual Module :: Links

function load(api, config) {
  api.module.request("links/features/load.js")
  api.module.request("links/features/create.js")

  shared = api.module.request("shared.js")
  links  = api.module.request("links/shared")
}

function unload(api) {
  api.module.unload("digitalBrain.visual.links.load")
  api.module.unload("digitalBrain.visual.links.create")

  // remove link nodes
  shared.getNodes().forEach(function (node) {
    links.removeAll(node)
  })
}

var shared
var links

module.exports = {
  info: {
    id:          "digitalBrain.visual.links",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "Draw links between nodes"
  },

  load: load, unload: unload
}
