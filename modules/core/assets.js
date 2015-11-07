// Assets Module
// loads assets like js, css

function init(app) {
  rootPath = app.config.root
}

function loadJs(path) {
  return require(rootPath + path)
}

function loadCss(path) {
  var ref = document.createElement("link")
  ref.setAttribute("rel", "stylesheet")
  ref.setAttribute("type", "text/css")
  ref.setAttribute("href", path)

  document.getElementsByTagName("head")[0].appendChild(ref)

  return ref
}

var rootPath = ""

module.exports = {
  init: init, loadJs: loadJs, loadCss: loadCss
}
