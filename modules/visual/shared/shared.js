// Shared Library

function init(app) {
  subscribe([
    { id: "visual.thought.create", handler: onVisualThoughtCreate },
    { id: "visual.layer.move",     handler: onVisualLayerMove }
  ])
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

function onVisualLayerMove(event) {
  layerOffset = event
}

var layerOffset = { x:0, y:0 }
var thoughtById = {}
var visualNodeByThoughtId = {}
var thoughtByVisualNode = {}

module.exports = {
  init:                     init,
  getVisualNodeByThought:   getVisualNodeByThought,
  getThoughtByVisualNode:   getThoughtByVisualNode,
  getVisualNodeByThoughtId: getVisualNodeByThoughtId,
  getThoughtById:           getThoughtById,
  getLayerOffset:           function () { return layerOffset }
}
