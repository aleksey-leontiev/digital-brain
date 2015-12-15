// Quick Links Module

function load(api) {
  view = {
    root: api.views.commitToPanel("assets/view.html", {
            t: api.l10n.get("assets/translation.json") }),
    card: api.views.template("assets/thought-card.html"),
    list: $("#links")
  }

  api.events.subscribe([
    { id: "brain.thought.select",  handler: onBrainThoughtSelect },
  ])

  brain = api.module.request("app:brain.js")
  api.module.request("features/open.js")
}

function unload(api) {
  api.events.unsubscribe()
}

function onBrainThoughtSelect(thought) {
  clearView()

  thought.links.forEach(function (link) {
    var thought = brain.getThoughtById(link.to)
    if (thought != null) { appendView(thought, link) }
  })
}

function appendView(thought, link) {
  var html = view.card({
    thought: thought, link: link,
    showImage: module.exports.config.showImage && thought.image
  })
  view.list.append(html)
}

function clearView() {
  view.list.html("")
}

var brain
var view

module.exports = {
  info: {
    id:          "digitalBrain.quick.links",
    name:        "Quick Links",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "Allows to view linked thoughts"
  },
  config: {
    showImage: true
  },
  load: load, unload: unload
}
