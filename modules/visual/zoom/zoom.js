// Visual Nodes Module

function load(api) {
  api.events.subscribe([
    { id: "key.down", handler: onKeyDown },
    { id: "visual.frame", handler: onVisualFrame }
  ])
}

function unload(api) {
  api.events.unsubscribe()
}

function onKeyDown(event) {
  if (event.which == 187)
    zoom += .25
  if (event.which == 189)
    zoom -= .25
  if (zoom < .25)
    zoom = .25
}

function onVisualFrame() {
  view.zoom = view.zoom + ((zoom - view.zoom) * .05)
}

var zoom = 1

module.exports = {
  load: load, unload: unload,

  info: {
    id:      "digitalBrain.visual.zoom",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
