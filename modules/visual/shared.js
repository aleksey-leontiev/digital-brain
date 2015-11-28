// Shared Library

function load(api, config) {
  api.events.subscribe([
    { id: "visual.thought.create", handler: onVisualThoughtCreate },
    { id: "visual.layer.moved",     handler: onVisualLayerMoved }
  ])
}

function unload(api) {
  api.events.unsubscribe()
}

function onVisualThoughtCreate(event) {
  thoughtById[event.thought._id]           = event.thought
  thoughtByVisualNode[event.node]          = event.thought

  visualNodeByThoughtId[event.thought._id] = event.node
  //visualNodeByThought[event.thought]       = event.node
}

function getThoughtById(id) {
  return thoughtById[id]
}

function getVisualNodeByThoughtId(id) {
  return visualNodeByThoughtId[id]
}

function getVisualNodeByThought(thought) {
  return visualNodeByThoughtId[thought._id]
}

function getThoughtByVisualNode(visualNode) {
  return thoughtByVisualNode[visualNode]
}

function onVisualLayerMoved(event) {
  layerOffset = event.offset
}

var layerOffset = { x:0, y:0 }
var thoughtById = {}
var visualNodeByThoughtId = {}
var thoughtByVisualNode = {}

module.exports = {
  info: {
    id:      "digitalBrain.visual.shared",
    version: "0.1",
    author:  "Alexey Leontiev"
  },
  load:                     load,
  unload: unload,
  getVisualNodeByThought:   getVisualNodeByThought,
  getThoughtByVisualNode:   getThoughtByVisualNode,
  getVisualNodeByThoughtId: getVisualNodeByThoughtId,
  getThoughtById:           getThoughtById,
  getLayerOffset:           function () { return layerOffset }
}
