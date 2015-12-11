// Link Nodes :: List

function load(api) {
  api.views.commitToPanel("view.html")

  api.events.subscribe([
    { id: "brain.thought.select",  handler: onBrainThoughtSelect },
  ])

  linksList = $("#links")

  shared = api.app.request("modules/shared")
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
  var result = ""

  result += "<div class='thought-link uk-panel uk-panel-hover uk-panel-box' data-thougth-id='" +thought._id+ "'>"
  if (thought.image && module.exports.config.showImage) {
    result += "  <div class='uk-panel-teaser'>"
    result += "    <img src='" + thought.image + "' class='center-cropped'>"
    result += "  </div> "
  }
  result += "  <h3 class='uk-panel-title'>" + thought.title + "</h3>"
  result += "  <p>" + (thought.description || "") + "</p> "
  result += "  <small><em>" + (link.description || "")+ "</em></small> "
  result += "</div>"

  return result
}

var shared = null
var linksList = null

module.exports = {
  info: {
    id:      "digitalBrain.quick.links",
    name:    "Quick Links",
    version: "0.1",
    author:  "Alexey Leontiev"
  },
  config: {
    showImage: true
  },
  load: load, unload: unload
}
