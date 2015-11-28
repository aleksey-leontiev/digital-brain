// Titlebar Module
// Creates stylish titlebar

function load(api, config) {
  api.assets.loadCSS("style.css")
  api.views.appendView("view.html", "body")

  view = {
    originalTitlebar: $("#titlebar"),
    titlebar:         $("#left-titlebar")
  }

  view.originalTitlebar.fadeOut()
}

function unload(api) {
  view.titlebar.remove()
  view.originalTitlebar.fadeIn()
}

var view

module.exports = {
  load: load,
  unload: unload,

  info: {
    id:      "digitalBrain.extras.fancyTitlebar",
    name:    "Fancy Titlebar",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
