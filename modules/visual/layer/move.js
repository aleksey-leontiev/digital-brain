// Move Layer Module
// allows to move layer

function init(app) {
  subscribe([
    { id: "visual.frame", handler: onVisualFrame },
    { id: "visual.layer.move", handler: onVisualLayerMove }
  ])
}

function onVisualFrame() {
  dx = 0
  dy = 0

  if (Key.isDown("left")) { dx = -10 }
  if (Key.isDown("right")) { dx = 10 }
  if (Key.isDown("up")) { dy = -10 }
  if (Key.isDown("down")) { dy = 10 }

  if (dx != 0 || dy != 0) {
    notify("visual.layer.move", {delta:{x:dx, y:dy}})
  }
}

function onVisualLayerMove(event) {
  project.layers.forEach(function (layer) {
    //if (startLayerPos[layer] == null) {
    //  startLayerPos[layer] = layer.position
    //}

    layer.position.x -= event.delta.x
    layer.position.y -= event.delta.y
    //layer.position.x = startLayerPos[layer].x - event.offset.x
    //layer.position.y = startLayerPos[layer].y - event.offset.y
  })

  layerOffset.x += event.delta.x
  layerOffset.y += event.delta.y

  notify("visual.layer.moved", { offset: layerOffset })
}

var startLayerPos = {}
var layerOffset = { x:0, y:0 };

module.exports = { init: init }
