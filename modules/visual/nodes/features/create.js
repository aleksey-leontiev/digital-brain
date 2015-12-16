// Visual :: Nodes :: Create

function load(mapi) {
  api = mapi

  api.events.subscribe([
    { id: "visual.mouse.down",  handler: onMouseDown },
    { id: "brain.thought.new",  handler: onBrainThoughtNewOrLoad },
    { id: "brain.thought.load", handler: onBrainThoughtNewOrLoad }
  ])

  meta   = api.module.request("app:meta.js")
  brain  = api.module.request("app:brain.js")
  shared = api.module.request("shared.js")

  layer  = api.events.request("visual.layer", "nodes")
  t      = api.l10n.get("nodes/assets/translation.json")
}

function unload(api) {
  api.events.unsubscribe()
}

function onMouseDown(event) {
  if (!event.event.ctrlKey) return
  var offset = shared.getLayerOffset()
  brain.createThought(t.newThought, event.point.x + offset.x, event.point.y + offset.y)
}

function onBrainThoughtNewOrLoad(event) {
  var offset  = shared.getLayerOffset()
  var thought = event.thought
  var node    = {};

  node.group = new Group();
  layer.bringToFront() // TODO: bring to front

  api.events.notify("visual.thought.create", { node: node, thought: thought })

  node.path = new Path.Circle({
    radius:    15,
    fillColor: "LightSlateGray"
  });

  node.text = new PointText({
    point:         [20, 0],
    justification: 'left',
    fontSize:      16,
    content:       thought.title
  });

  node.group.addChildren([node.path, node.text])
  node.group.pivot    = new Point(0, 0)
  node.group.position = new Point(thought.x - offset.x, thought.y - offset.y);

  node.path.onClick = function() {
    api.events.notify("brain.thought.select", thought)
    api.events.notify("visual.thought.select", node)
  }
  node.path.onMouseDown = function(e) {
    api.events.notify("visual.thought.mouse.down", {
      node: node, thought: thought, point: e.point })
  }
  node.path.onMouseUp = function(e) {
    api.events.notify("visual.thought.mouse.up", {
      node: node, thought: thought, point: e.point })
  }
  node.path.onMouseDrag = function(e) {
    api.events.notify("visual.thought.drag", {
      node: node, thought: thought, point: e.point })
  }

  layer.addChild(node.group)
  meta.set(thought._id, "visual", node)

  api.events.notify("visual.thought.created", {
    node: node, thought: thought })
}

var layer
var api
var shared
var meta
var brain
var t

module.exports = {
  info: {
    id:      "digitalBrain.visual.nodes.create",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load, unload: unload
}
