// Search Module :: Highlight Search Results
// Highlights throughts

function init(app) {
  subscribe([
    { id: "visual.thought.create",         handler: onVisualThoughtCreate }
  ])
}

function onVisualThoughtCreate(event) {
  event.node.description = new PointText({
    point: [20, 20],
    justification: 'left',
    fontSize: 12,
    fillColor: 'slategray',
    content: event.thought.description.substring(0, 50)
  });

  event.node.group.addChild(event.node.description);
}

module.exports = { init: init }
