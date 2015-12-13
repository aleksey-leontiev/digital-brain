var remote = require("remote")

// configuration
this.config = {
  appRootPath:  __dirname + "/",
  userDataPath: remote.getGlobal("userDataPath"),
  moduleRootPath: __dirname + "/modules/"
}

app = this

// load core modules
module.exports.modules = require(this.config.appRootPath + "modules/core/modules/modules.js").init(this)
module.exports.log     = this.modules.load("app:core/log.js")
module.exports.events  = this.modules.load("app:core/events")
module.exports.assets  = this.modules.load("app:core/assets")
module.exports.views   = this.modules.load("app:core/views")
