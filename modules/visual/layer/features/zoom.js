// Visual Module :: Layer :: Zoom

function load(api) {
  api.events.subscribe([
    { id: "key.down",     handler: onKeyDown },
    { id: "visual.frame", handler: onVisualFrame }
  ])
}

function unload(api) {
  api.events.unsubscribe()
}

function onKeyDown(event) {
  if (event.target.id != "body") return

  if (event.which == 187) zoom += .25 // +
  if (event.which == 189) zoom -= .25 // -

  if (zoom < .25) zoom = .25
}

function onVisualFrame() {
  view.zoom = view.zoom + ((zoom - view.zoom) * .05)
}

var zoom = 1

module.exports = {
  info: {
    id:      "digitalBrain.visual.layer.zoom",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load, unload: unload
}
