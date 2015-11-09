// Brain visualization module

function init(app, config) {
  subscribe([
    { id: "brain.thought.changed",  handler: onBrainThoughtChanged },
    { id: "brain.thought.changing", handler: onBrainThoughtChanged }
  ])

  var modules = app.modules.loadModules(config.moduleRootPath, [
    "shared"
  ], config)
  shared = modules[0]
}

function onBrainThoughtChanged(thought) {
  var visualNode = shared.getVisualNodeByThought(thought)
  visualNode.text.content = thought.title
}

var shared = null

module.exports = { init: init }
