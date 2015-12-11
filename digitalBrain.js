var remote = require("remote")

// configuration
this.config = {
  appRootPath:  __dirname + "/",
  userDataPath: remote.getGlobal("userDataPath")
}

app = this

// load core modules
module.exports.modules = require(this.config.appRootPath + "modules/core/modules/modules.js")
module.exports.modules.init(this)

module.exports.events  = this.modules.load(this.config.appRootPath + "modules/core/events.js")
module.exports.assets  = this.modules.load(this.config.appRootPath + "modules/core/assets.js")
module.exports.views   = this.modules.load(this.config.appRootPath + "modules/core/views.js")
