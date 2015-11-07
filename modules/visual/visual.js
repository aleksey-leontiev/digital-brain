// Brain Visualization Module

function init(app) {
  // install paper.js
  paper = app.assets.loadJs("bower_components/paper/dist/paper-full.js");
  css   = app.assets.loadCss("assets/style.css");
  paper.install(window);
  paper.setup('canvas');

  subscribe([
    { id: "brain.thought.new",   handler: onBrainThoughtNewOrLoad },
    { id: "brain.thought.load",  handler: onBrainThoughtNewOrLoad },
    { id: "visual.get",          handler: onVisualGet },
    { id: "visual.layer",        handler: onVisualLayerRequest }
  ])

  layer  = request("visual.layer", "nodes")
  shared = app.modules.load("modules/visual/shared/shared")

  view.onFrame     = onFrame
  view.onMouseDown = onMouseDown
}

function onBrainThoughtNewOrLoad(thought) {
  var layerOffset = shared.getLayerOffset()
  var node = {};

  node.group = new Group();
  layer.bringToFront() // TODO: bring to front

  notify("visual.thought.create", { node: node, thought: thought })

  node.path = new Path.Circle({
    radius: 15,
    fillColor: "green"
  });

  node.text = new PointText({
    point: [20, 5],
    justification: 'left',
    fontSize: 16,
    fillColor: 'red',
    content: thought.title
  });

  node.group.addChildren([node.path, node.text])
  node.group.position = new Point(thought.x - layerOffset.x, thought.y - layerOffset.y);

  node.group.onMouseDown = function() {
    notify("brain.thought.select", thought)
    notify("visual.thought.select", node)
  };
  node.group.onMouseDrag = function(event) {
    notify("visual.thought.drag",
    {node: node, thought: thought, point:event.point})
  }
  node.group.onMouseUp = function(event) {
    notify("visual.thought.mouse.up",
    {node: node, thought: thought, point:event.point})
  }

  hash[thought._id] = node

  layer.addChild(node.group)
}

function onFrame(event) {
  notify("visual.frame")
}

function onMouseDown(event) {
  notify("visual.mouse.down", event)
}

function onVisualGet(thoughtId) {
  notify("visual.get:response", hash[thoughtId])
}

function onVisualLayerRequest(layerId) {
  l = layers[layerId]
  if (l == null) {
    layers[layerId] = l = new paper.Layer()
  }
  return l
}

var hash   = {}
var paper  = null
var layers = {}
var layer  = null
var shared = null

module.exports = { init: init }
