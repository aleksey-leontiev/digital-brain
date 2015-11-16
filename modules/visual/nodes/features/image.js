// Visual Module :: Image

function init(app) {
  subscribe([
    { id: "visual.thought.create", handler: onVisualThoughtCreate }
  ])
}

function onVisualThoughtCreate(event) {
  if (event.thought.image == null) return

  event.node.image = new Raster({
    source: event.thought.image
  })

  event.node.imageStroke = new Path.Circle({
    radius: 15,
    strokeColor: "black",
    opacity: .75
  })

  event.node.imageMask = new Path.Circle({
    radius: 15
  });

  event.node.imageGroup = new Group([event.node.imageMask, event.node.image]);
  event.node.imageGroup.clipped = true;

  event.node.image.onLoad = function () {
    event.node.image.scale(30 / Math.min(event.node.image.width, event.node.image.height))
    event.node.path.opacity = 0
  }

  event.node.group.addChild(event.node.imageGroup)
  event.node.group.addChild(event.node.imageStroke)
}

module.exports = { init: init }
