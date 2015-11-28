
function load(mapi, config) {
  $(document).keydown(function(event){
    var char = String.fromCharCode(event.which)
    mapi.events.notify("key.down", { char: char, ctrlKey: event.ctrlKey, which: event.which })
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

module.exports = {
  info: {
    id:      "digitalBrain.appEvents",
    version: "0.1",
    author:  "Alexey Leontiev"
  },

  load: load, unload: unload
}
