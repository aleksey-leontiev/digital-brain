// Link Nodes :: List

function load(api) {

  view = {
    root:      api.views.commitToPanel("assets/view.html", {
                 t: api.l10n.get("assets/translation.json") }),
    linksList: $("#links")
  }

  api.events.subscribe([
    { id: "brain.thought.select",  handler: onBrainThoughtSelect },
  ])

  shared = api.module.request("app:shared.js")
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
  view.linksList.append(getListView(thought, link))
}

function clearView() {
  view.linksList.html("")
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
var view

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
