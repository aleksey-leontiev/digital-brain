var remote = require("remote")

// configuration
this.config = {
  root: __dirname + "/",
  userDataPath: remote.getGlobal("userDataPath")
}

// load core nodes
module.exports.modules = require("./modules/core/modules")
module.exports.modules.init(this)
module.exports.events  = this.modules.load("./modules/core/events")
module.exports.assets  = this.modules.load("./modules/core/assets")
module.exports.views   = this.modules.load("./modules/core/views")

// export globally
notify     = this.events.notify
subscribe  = this.events.subscribeList
request    = this.events.request
commitView = this.views.commitView
