// Brain Visualization Module

function load(mapi) {
  api = mapi

  // install paper.js
  paper = api.assets.loadJSSync("bower_components/paper/dist/paper-full.js")
  paper.install(window)
  paper.setup("canvas")
  view.onFrame     = onFrame
  view.onMouseDown = onMouseDown

  // request submodules
  api.module.request("layer")
  api.module.request("nodes")
  api.module.request("links")
}

function unload(api) {
  api.events.unsubscribe()
}

function onFrame(event) {
  api.events.notify("visual.frame")
}

function onMouseDown(event) {
  api.events.notify("visual.mouse.down", event)
}

var api
paper = undefined

module.exports = {
  info: {
    id:      "digitalBrain.visual",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load, unload: unload,
}
