// Shared Library

function load(mapi) {
  api = mapi

  api.events.subscribe([
    { id: "visual.layer.moved",     handler: onVisualLayerMoved },
    { id: "visual.thought.created", handler: onVisualThoughtCreated },
    { id: "brain.thought.select",   handler: onBrainThoughtSelect },
  ])

  meta  = api.module.request("app:meta.js")
  brain = api.module.request("app:brain.js")
}

function unload(api) {
  api.events.unsubscribe()
}

function onBrainThoughtSelect(thought) {
  selectedThought = thought
}

function getVisualNode(id) {
  return meta.get(id, "visual")
}

function onVisualLayerMoved(event) {
  layerOffset = event.offset
}

function onVisualThoughtCreated(event) {
  nodes.push(event.node)
}

function getNodes() {
  return nodes
}

function getSelectedThought() {
  return selectedThought
}

function getDigStackTopId() {
  if (digStack.length == 0) return undefined
  return digStack.slice(-1)[0]._id
}

function digDown(thought) {
  digStack = []
  var current = thought

  while (current) {
    digStack.push(current)
    current = brain.getThoughtById(current.location.parent)
  }

  digStack = digStack.reverse()

  api.events.notify("dig.changed", {
    stack: digStack,
    top:   digStack.slice(-1)[0]
  })
}

function digUp() {
  digStack.pop()
  api.events.notify("dig.changed", {
    stack: digStack,
    top:   digStack.slice(-1)[0]
  })
}

var api
var nodes = []
var layerOffset = { x:0, y:0 }
var meta
var selectedThought
var digStack = []
var brain

module.exports = {
  info: {
    id:      "digitalBrain.visual.shared",
    version: "0.1",
    author:  "Alexey Leontiev"
  },
  load:   load,
  unload: unload,
  getVisualNode: getVisualNode,
  getNodes: getNodes,
  getSelectedThought: getSelectedThought,
  digDown: digDown,
  digUp: digUp,
  getDigStackTopId:getDigStackTopId,
  getLayerOffset: function () { return layerOffset }
}
