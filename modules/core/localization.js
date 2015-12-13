
function load(mapi) {
  api = mapi
}

function unload(api) {
}

function commitToApi(data) {
  return {
    l10n: {
      locale: getLocale(),
      get: function(fileName) { return get(data.rootPath + fileName) }
    }
  }
}


function get(path) {
  var jsonfile = require("jsonfile")
  var hash     = jsonfile.readFileSync(path)
  var locale   = getLocale()
  var lhash    = hash[locale]

  // no translation found for specified locale
  // return default
  if (lhash == null) return hash[defaultLocale]

  return lhash
}

function getLocale() {
  return module.exports.config.locale || navigator.language
}

var api
var defaultLocale = "en"

module.exports = {
  info: {
    id:          "digitalBrain.core.localization",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "It provides localization functionality."
  },
  config: {
    locale: undefined
  },
  load:        load,
  unload:      unload,
  commitToApi: commitToApi
}
