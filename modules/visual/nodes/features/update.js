// Brain visualization module

function load(api) {
  api.events.subscribe([
    { id: "brain.thought.changed",  handler: onBrainThoughtChanged },
    { id: "brain.thought.changing", handler: onBrainThoughtChanged }
  ])

  shared = api.module.request("shared.js")
}

function unload(api) {
  api.events.unsubscribe()
}

function onBrainThoughtChanged(thought) {
  var node = shared.getVisualNode(thought._id)
  node.text.content = thought.title
}

var shared = null

module.exports = {
  info: {
    id:      "digitalBrain.visual.nodes.update",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load, unload: unload
}
