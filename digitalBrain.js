var remote = require("remote")

// configuration
this.config = {
  root:         __dirname + "/",
  userDataPath: remote.getGlobal("userDataPath")
}

// load core nodes
module.exports.modules = require(this.config.root + "modules/core/modules.js")
module.exports.modules.init(this)
module.exports.events  = this.modules.load(this.config.root + "modules/core/events.js")
module.exports.assets  = this.modules.load(this.config.root + "modules/core/assets.js")
module.exports.views   = this.modules.load(this.config.root + "modules/core/views.js")

// export globally
notify      = this.events.notify
subscribe   = this.events.subscribeList
request     = this.events.request
commitView  = this.views.commitView
loadModule  = this.modules.load
loadModules = this.modules.loadModules
createOverlay = this.views.createOverlay

loadJSAsync = this.assets.loadJSAsync
