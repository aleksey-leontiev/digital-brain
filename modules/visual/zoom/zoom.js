// Visual Nodes Module

function init(app, config) {
  subscribe([
    { id: "key.down", handler: onKeyDown },
    { id: "visual.frame", handler: onVisualFrame }
  ])
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

module.exports = { init: init }
