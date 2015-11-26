// Link Nodes :: List

function load(api, config) {
  api.events.subscribe([
    { id: "brain.thought.select",  handler: onBrainThoughtSelect },
  ])

  linksList = $("#links")

  shared = api.module.request("shared")
}

function unload(api) {
  api.events.unsubscribe()
}

function onBrainThoughtSelect(thought) {
  clearView()

  thought.links.forEach(function (link) {
    var thought = shared.getThoughtById(link.to)
    if (thought != null) {
      appendView(thought, link)
    }
  })
}

function appendView(thought, link) {
  linksList.append(getListView(thought, link))
}

function clearView() {
  linksList.html("")
}

function getListView(thought, link) {
  return  "<div class='thought-link uk-panel uk-panel-hover' data-thougth-id='" +thought._id+ "'>" +
          "  <h3 class='uk-panel-title'>" + thought.title + "</h3>" +
          "  <p>" + (thought.description || "") + "</p> " +
          "  <small><em>" + (link.description || "")+ "</em></small> " +
          "</div>"
}

var shared = null
var linksList = null

module.exports = {
  info: {
    id:      "digitalBrain.visual.links.list",
    version: "0.1",
    author:  "Alexey Leontiev"
  },
  load: load, unload: unload
}
