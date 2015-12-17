// Visual :: Nodes :: Description

function load(api) {
  api.events.subscribe([
    { id: "visual.thought.create",  handler: onVisualThoughtCreate },
    { id: "brain.thought.changed",  handler: onBrainThoughtChanged },
    { id: "brain.thought.changing", handler: onBrainThoughtChanged }
  ])

  shared = api.module.request("shared.js")
}

function unload(api) {
  api.events.unsubscribe()

  // remove all description nodes
  shared.getNodes().forEach(function (node) {
    removeDescription(node)
  })
}

function onVisualThoughtCreate(event) {
  createDescription(event.thought, event.node)
}

function onBrainThoughtChanged(thought) {
  var node = shared.getVisualNode(thought._id)

  if (node.description) {
    node.description.content = getShortContent(thought.description)
  }
}

function getShortContent(text) {
  return (text || "").substring(0, 50)
}

function createDescription(thought, node) {
  node.description = new PointText({
    point:         [20, 12],
    fontSize:      12,
    justification: "left",
    fillColor:     "slategray",
    content:       getShortContent(thought.description)
  })

  node.root.addChild(node.description)
}

function removeDescription(node) {
  node.description.remove()
}

var shared

module.exports = {
  load: load, unload: unload,

  info: {
    id:          "digitalBrain.visual.nodes.description",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "Adds description line to the node"
  }
}
