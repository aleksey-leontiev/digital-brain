
function load(mapi, config) {

  mapi.events.subscribe([
    { id: "app.close", handler: onAppClose },
    { id: "app.fullscreen", handler: onAppFullscreen }

  ])

  $(document).keydown(function(event) {
    var char = String.fromCharCode(event.which)
    mapi.events.notify("key.down", { char: char, ctrlKey: event.ctrlKey, shiftKey: event.shiftKey, which: event.which, target:event.target })
  })

  $(document).keyup(function(event) {
    var char = String.fromCharCode(event.which)
    mapi.events.notify("key.up", { char: char, ctrlKey: event.ctrlKey, shiftKey: event.shiftKey, which: event.which, target:event.target })
  })

  $(window).resize(function(event) {
    mapi.events.notify("window.resize", {})
  })

  $(window).mousemove(function (event) {
    mapi.events.notify("mouse.move", event)
  })

  $("html").on("dragover", function(event) {
    event.preventDefault();
    event.stopPropagation();
  });

  $("html").on("dragleave", function(event) {
    event.preventDefault();
    event.stopPropagation();
  });

  $("html").on("drop", function(event) {
    event.preventDefault();
    event.stopPropagation();
  });
}

function unload(mapi) {
  // body...
}

function onAppClose(event) {
  var remote = require('remote')
  var window = remote.getCurrentWindow()
  app.modules.saveConfigs()
  window.close()
}

function onAppFullscreen(event) {
  var remote = require('remote')
  var window = remote.getCurrentWindow()
  window.setFullScreen(event.value)
}

module.exports = {
  info: {
    id:      "digitalBrain.appEvents",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load, unload: unload
}
