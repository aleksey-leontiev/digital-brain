// Brain visualization module

function init(app) {
  subscribe([
    { id: "brain.thought.changed",  handler: onBrainThoughtChanged },
    { id: "brain.thought.changing", handler: onBrainThoughtChanged }
  ])

  shared = app.modules.load("./modules/visual/shared/shared.js")
}

function onBrainThoughtChanged(thought) {
  var visualNode = shared.getVisualNodeByThought(thought)
  visualNode.text.content = thought.title
}

var shared = null

module.exports = { init: init }
