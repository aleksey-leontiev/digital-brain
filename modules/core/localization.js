
function load(mapi) {
  api = mapi
}

function unload(api) {
}

function commitToApi(data) {
  return {
    l10n: {
      get: function(fileName) { return get(data.rootPath + fileName)["en"] }
    }
  }
}


function get(path) {
  var jsonfile = require("jsonfile")
  var l10n     = jsonfile.readFileSync(path)

  return l10n
}

var api

module.exports = {
  info: {
    id:          "digitalBrain.core.localization",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "It provides localization functionality."
  },

  load:        load,
  unload:      unload,
  commitToApi: commitToApi
}
