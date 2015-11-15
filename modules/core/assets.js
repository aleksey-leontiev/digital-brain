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

function loadJSAsync(path, onload) {
  var head      = document.getElementsByTagName('head')[0]
  var script    = document.createElement('script')
  script.type   = 'text/javascript'
  script.src    = path
  script.onload = onload
  head.appendChild(script)
  return script
}

function loadJSSync(path) {
  return require(path)
}

var rootPath = ""

module.exports = {
  init: init, loadJs: loadJs, loadCss: loadCss, loadJSAsync: loadJSAsync, loadJSSync: loadJSSync
}
