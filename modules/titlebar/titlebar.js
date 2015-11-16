// Titlebar Module
// Creates stylish titlebar

function init(app, config) {
  loadCSS(config.moduleRootPath + "style.css")
  appendView(config.moduleRootPath + "view.html", "body")

  titlebar = $("#left-titlebar")

  subscribe([
    { id: "mouse.move", handler: onMouseMove }
  ])
}

function onMouseMove(event) {
  if (event.pageX < 32) {
    titlebar.css("opacity", 1)
  } else {
    titlebar.css("opacity", 0)
  }
}

var titlebar = null

module.exports = { init: init }
