// Assets Module
// loads assets like js, css

function load(api, config) { }

function loadCSS(path) {
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

function commitToApi(data) {
  return {
    assets: {
      loadCSS:     function(path)         { return loadCSS(data.rootPath + path) },
      loadJSAsync: function(path, onload) { return loadJSAsync(data.rootPath + path, onload) },
      loadJSSync:  function(path)         { return loadJSSync(data.rootPath + path) }
    }
  }
}

module.exports = {
  info: {
    id:          "digitalBrain.core.assets",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "Provides functionality to manipulate assets."
  },

  load: load,
  commitToApi: commitToApi
}
