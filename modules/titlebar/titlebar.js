// Titlebar Module
// Creates stylish titlebar

function load(api, config) {
  api.assets.loadCSS("style.css")
  api.views.appendView("view.html", "body")

  view = {
    titlebar: $("#left-titlebar")
  }
}

function unload(api) {
  view.titlebar.remove()
}

var view

module.exports = {
  load: load,
  unload: unload,

  info: {
    id:      "digitalBrain.titlebar",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
