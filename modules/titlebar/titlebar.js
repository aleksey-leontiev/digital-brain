// Titlebar Module
// Creates stylish titlebar

function init(app, config) {
  loadCSS(config.moduleRootPath + "style.css")
  appendView(config.moduleRootPath + "view.html", "body")
}

module.exports = { init: init }
