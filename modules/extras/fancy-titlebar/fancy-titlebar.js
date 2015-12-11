// Titlebar Module
// Creates stylish titlebar

function load(mapi) {
  api = mapi

  api.assets.loadCSS("style.css")
  api.views.appendView("view.html", "body")

  view = {
    originalTitlebar: $("#titlebar"),
    titlebar:         $("#left-titlebar")
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
  api.events.notify("app.close")
}

function onMaximizeButtonClick() {
  api.events.notify("app.fullscreen", { value: true })
}

var view
var api

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
