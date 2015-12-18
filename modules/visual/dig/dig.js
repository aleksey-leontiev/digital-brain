// Visual Module :: Dig

function load(api) {
  api.events.subscribe([
    { id: "key.down",             handler: onKeyDown },
    { id: "dig.changed",          handler: onDigChanged },
    { id: "brain.thought.select", handler: onBrainThoughtSelect },
    { view: ".breadcrumbs-path",  delegate: "body", id: "click", handler: onBreadcrumbPathClick }
  ])

  view = {
    root:        api.views.appendView("dig/assets/view.html", "body"),
    template:    api.views.template("dig/assets/template.html"),
    breadcrumbs: $("#breadcrumbs")
  }

  t      = api.l10n.get("dig/assets/translation.json")
  layers = api.module.request("layer/shared.js")
  brain  = api.module.request("app:brain.js")
  shared = api.module.request("shared.js")

  updateBreadcrumbs([])
}

function onKeyDown(event) {
  if (event.char == "D" && event.ctrlKey) {
    if (!event.shiftKey) {
      var thought = shared.getSelectedThought()
      shared.digDown(thought)
    } else {
      shared.digUp()
    }
  }
}

function onBrainThoughtSelect(thought) {
  var currentId = shared.getDigStackTopId()
  var parent    = brain.getParent(thought)
  var parentId  = parent ? parent._id : undefined

  if (currentId != parentId) {
    shared.digDown(parent)
  }
}

function onDigChanged(event) {
  var parentId = event.top ? event.top._id : "root"
  layers.showLayer("nodes:" + parentId)
  updateBreadcrumbs(event.stack)
}

function onBreadcrumbPathClick(event) {
  var thoughtId = $(event.target).data("thought-id")
  var thought   = brain.getThoughtById(thoughtId)
  shared.digDown(thought)
}

function updateBreadcrumbs(stack) {
  view.breadcrumbs.html("")

  // append root node
  var html = view.template({ thoughtId: "", title: t.root.toUpperCase() })
  view.breadcrumbs.append(html)

  // append childs
  stack.forEach(function(thought, idx) {
    var html = view.template({
      thoughtId: thought._id,
      title:     thought.title.toUpperCase(),
      isLast:    idx == stack.length - 1
    })
    view.breadcrumbs.append(html)
  })

  // show or hide
  if (stack.length > 0) {
    view.breadcrumbs.fadeIn()
  } else {
    view.breadcrumbs.fadeOut()
  }
}

var t
var view = {}
var layers
var shared
var brain

module.exports = {
  info: {
    id:      "digitalBrain.visual.dig",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load
}
