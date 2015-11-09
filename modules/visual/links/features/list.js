// Link Nodes :: List

function init(app, config) {
  subscribe([
    { id: "brain.thought.select",  handler: onBrainThoughtSelect },
  ])

  linksList = $("#links")

  var modules = app.modules.loadModules(config.moduleRootPath, [
    "shared"
  ], config)
  shared = modules[0]
}

function onBrainThoughtSelect(thought) {
  clearView()

  thought.links.forEach(function (link) {
    var thought = shared.getThoughtById(link)
    appendView(thought)
  })
}

function appendView(thought) {
  linksList.append(getListView(thought))
}

function clearView() {
  linksList.html("")
}

function getListView(thought) {
  return  "<div class='thought-link uk-panel uk-panel-hover' data-thougth-id='" +thought._id+ "'>" +
          "  <h3 class='uk-panel-title'>" + thought.title + "</h3>" +
          "  " + thought.description +
          "</div>"
}

var shared = null
var linksList = null

module.exports = {
  init: init
}
