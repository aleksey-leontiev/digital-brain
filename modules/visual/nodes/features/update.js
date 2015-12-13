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
  var visualNode = shared.getVisualNodeByThought(thought)
  visualNode.text.content = thought.title
}

var shared = null

module.exports = {
  load: load, unload: unload,

  info: {
    id:      "digitalBrain.visual.nodes.update",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
