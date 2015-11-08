
function init(app) {
  subscribe([
    { id: "key.down",             handler: onKeyDown },
    { id: "brain.thought.open",   handler: onBrainThoughtOpen },
    { id: "brain.thought.close",   handler: onBrainThoughtClose },
    { id: "brain.thought.select", handler: onBrainThoughtSelect },
  ])
}

function onKeyDown(event) {
  if (activeThought == null) return

  if (event.char == "O" && event.ctrlKey) {
    notify("brain.thought.open", activeThought)
  }

  if (event.which == 27) {
    notify("brain.thought.close", activeThought)
  }
}

function onBrainThoughtOpen(thought) {
  $("#details").show()
  CKEDITOR.instances.editor1.setData(activeThought.content || "")
}

function onBrainThoughtClose(thought) {
  save()
  $("#details").hide()
  activeThought = null
}

function onBrainThoughtSelect(thought) {
  activeThought = thought
}

function save() {
  activeThought.content = CKEDITOR.instances.editor1.getData()
  notify("brain.thought.changed", activeThought)
}

var activeThought = null

module.exports = { init: init }
