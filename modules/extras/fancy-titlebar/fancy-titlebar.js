// Titlebar Module
// Creates stylish titlebar

function load(api, config) {
  api.assets.loadCSS("style.css")
  api.views.appendView("view.html", "body")

  view = {
    originalTitlebar: $("#titlebar"),
    titlebar:         $("#left-titlebar"),
    window:           require("remote").getCurrentWindow()
  }

  api.events.subscribe([
    { view: "#fancy-titlebar-close-button", id: "click", handler: onCloseButtonClick },
    { view: "#fancy-titlebar-max-button",   id: "click", handler: onMaximizeButtonClick }
  ])

  view.originalTitlebar.fadeOut()
}

function unload(api) {
  view.titlebar.remove()
  view.originalTitlebar.fadeIn()
}

function onCloseButtonClick() {
  view.window.close()
}

function onMaximizeButtonClick() {
  view.window.setFullScreen(!view.window.isFullScreen())
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
