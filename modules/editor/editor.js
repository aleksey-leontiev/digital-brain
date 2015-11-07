
function init(app) {
  subscribe([
    { id: "key.down",             handler: onKeyDown },
    { id: "brain.thought.open",   handler: onBrainThoughtOpen },
    { id: "brain.thought.select", handler: onBrainThoughtSelect },
  ])
}

function onKeyDown(event) {
  if (activeThought == null) return

  if (event.char == "O" && event.ctrlKey) {
    notify("brain.thought.open", activeThought)
  }
}

function onBrainThoughtOpen(thought) {
  $("#details").toggle()
}

function onBrainThoughtSelect(thought) {
  activeThought = thought
}

var activeThought = null

module.exports = { init: init }
