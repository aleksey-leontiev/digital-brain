// Visual Module :: Dig

function load(api) {
  api.events.subscribe([
    { id: "key.down",    handler: onKeyDown },
    { id: "dig.changed", handler: onDigChanged },
    { delegate: "#breadcrumbs-box", view: ".breadcrumbs-path", id: "click", handler: onBreadcrumbPathClick }
  ])

  view = {
    root:        api.views.appendView("dig/view.html", "body"),
    breadcrumbs: $("#breadcrumbs")
  }

  layers = api.module.request("layer/shared.js")
  shared = api.module.request("shared.js")
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

function onDigChanged(event) {
  var parentId = event.top ? event.top._id : "root"
  layers.showLayer("nodes:" + parentId)
  updateBreadcrumbs(event.stack)
}

function onBreadcrumbPathClick(event) {

}

function updateBreadcrumbs(stack) {
  view.breadcrumbs.html("")

  view.breadcrumbs.append("<li><a class='breadcrumbs-path' data-idx='" + (stack.length) + "'>ROOT</a></li>")
  stack.forEach(function(thought, idx) {
    view.breadcrumbs.append("<li><a class='breadcrumbs-path' data-idx='" + (stack.length - idx - 1) + "'>" + thought.title.toUpperCase() + "</a></li>")
  })

  $(".breadcrumbs-path").on("click", function (item) {
    var countToPop = $(item.target).data("idx")
    for (i=0;i<countToPop;i++) {
      shared.digUp()
    }
  })
}

var layers
var view = {}
var shared

module.exports = {
  info: {
    id:      "digitalBrain.visual.dive",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load
}
