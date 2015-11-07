// Move Layer Module

function init(app) {
  subscribe([
    { id: "visual.frame", handler: onVisualFrame }
  ])
}

function onVisualFrame() {
  dx = 0
  dy = 0

  if (Key.isDown("left")) { dx = 5 }
  if (Key.isDown("right")) { dx = -5 }
  if (Key.isDown("up")) { dy = 5 }
  if (Key.isDown("down")) { dy = -5 }

  if (dx != 0 || dy != 0) {
    project.layers.forEach(function (layer) {
      layer.position.x += dx
      layer.position.y += dy
    })
    layerOffset.x -= dx
    layerOffset.y -= dy
    notify("visual.layer.move", layerOffset)
  }
}

var layerOffset = { x:0, y:0 };

module.exports = { init: init }
