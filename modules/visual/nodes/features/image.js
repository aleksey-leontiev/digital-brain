// Visual :: Nodes :: Image

function load(api) {
  api.events.subscribe([
    { id: "visual.thought.create", handler: onVisualThoughtCreate },
    { id: "brain.thought.changed", handler: onBrainThoughtChanged }
  ])

  shared = api.module.request("shared.js")
}

function unload(api) {
  api.events.unsubscribe()

  // remove all image nodes
  shared.getNodes().forEach(function (node) {
    removeImage(node)
  })
}

function onVisualThoughtCreate(event) {
  createImage(event.thought, event.node)
}

function onBrainThoughtChanged(thought) {
  var node = shared.getVisualNode(thought._id)
  if (node.image) {
    node.image.source = thought.image
  } else {
    createImage(thought, node, true)
  }
}

function createImage(thought, node) {
  if (thought.image == null) return

  node.image = new Raster({ source: thought.image })
  node.imageMask = new Path.Circle({ radius: 15 })
  node.imageBorder = new Path.Circle({
    radius:      15,
    strokeColor: "black",
    opacity:     .75
  })
  node.image.onLoad = function () {
    node.image.scaling = 30 / Math.min(node.image.width, node.image.height)
    node.target.opacity  = 0
    node.target.bringToFront()
  }

  node.imageGroup = new Group([node.imageMask, node.image])
  node.imageGroup.clipped = true

  node.image.position       = node.root.position
  node.imageMask.position   = node.root.position
  node.imageBorder.position = node.root.position

  node.root.addChild(node.imageGroup)
  node.root.addChild(node.imageBorder)
}

function removeImage(node) {
  if (node.imageGroup)  node.imageGroup.remove()
  if (node.imageBorder) node.imageBorder.remove()
  node.target.opacity = 1 // return opacity back
}

var shared

module.exports = {
  info: {
    id:          "digitalBrain.visual.nodes.image",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "Provides image functionality of thought."
  },

  load: load, unload: unload
}
