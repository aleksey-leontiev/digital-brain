// Brain visualization module

function load(mapi) {
  api = mapi

  api.events.subscribe([
    { id: "visual.mouse.down",  handler: onMouseDown },
    { id: "brain.thought.new",  handler: onBrainThoughtNewOrLoad },
    { id: "brain.thought.load", handler: onBrainThoughtNewOrLoad }
  ])

  meta   = api.module.request("app:meta.js")
  shared = api.module.request("shared.js")

  layer  = api.events.request("visual.layer", "nodes")
}

function unload(api) {
  api.events.unsubscribe()
}

function onMouseDown(event) {
  if (event.event.ctrlKey) {
    id = Math.random().toString(36).substr(2) // TODO: generate with shortid
    layerOffset = shared.getLayerOffset()

    api.events.notify("brain.thought.new", { thought: {
      _id: id, title: "new",
      x: event.point.x + layerOffset.x,
      y: event.point.y + layerOffset.y,
      links: [] }})
  }
}

function onBrainThoughtNewOrLoad(event) {
  var layerOffset = shared.getLayerOffset()
  var node = {};

  node.group = new Group();
  layer.bringToFront() // TODO: bring to front

  api.events.notify("visual.thought.create", { node: node, thought: event.thought })

  node.path = new Path.Circle({
    radius: 15,
    fillColor: "LightSlateGray"
  });

  node.text = new PointText({
    point: [20, 0],
    justification: 'left',
    fontSize: 16,
    content: event.thought.title
  });

  node.group.addChildren([node.path, node.text])
  node.group.position = new Point(event.thought.x - layerOffset.x, event.thought.y - layerOffset.y);

  node.path.onClick = function() {
    api.events.notify("brain.thought.select", event.thought)
    api.events.notify("visual.thought.select", node)
  };
  node.path.onMouseDown = function(e) {
    api.events.notify("visual.thought.mouse.down",
    {node: node, thought: event.thought, point:e.point})
  };
  node.path.onMouseDrag = function(e) {
    api.events.notify("visual.thought.drag",
    { node: node, thought: event.thought, point:e.point })
  }
  node.path.onMouseUp = function(e) {
    api.events.notify("visual.thought.mouse.up",
    {node: node, thought: event.thought, point:e.point})
  }

  api.events.notify("visual.thought.created", { node: node, thought: event.thought })

  meta.set(event.thought._id, "visual", node)

  layer.addChild(node.group)
}

var layer
var api
var shared
var meta

module.exports = {
  info: {
    id:      "digitalBrain.visual.nodes.create",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load, unload: unload
}
