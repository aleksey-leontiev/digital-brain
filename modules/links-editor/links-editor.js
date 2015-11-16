
function init(app, config) {
  // create overlay
  overlay = createOverlay(
    "links-editor-overlay",
    config.moduleRootPath + "view.html")

  linksList       = $("#lem_links-list")
  linkTitle       = $("#lem_link-title")
  linkDescription = $("#lem_link-description")
  linkToId        = $("#lem_link-to-id")

  subscribe([
    { id: "key.down",             handler: onKeyDown },
    { id: "brain.thought.select", handler: onBrainThoughtSelect },
    { id: "brain.open.completed", handler: onBrainOpenCompleted },

    { view: "#lem_link-title",       id: "change", handler: onChnaged },
    { view: "#lem_link-description", id: "change", handler: onChnaged },
    { view: "#lem_add-new",          id: "click", handler: onAddNew },

    { delegate: "#lem_links-list", view: ".lem_link-item", id: "click", handler: onLinkClick }
  ])

  // load additional modules
  var loaded = loadModules(config.appRootPath, ["modules/shared"], config)
  shared = loaded[0]

  // prepare autocomplete
}

function onKeyDown(event) {
  if (activeThought == null) return

  if (isShortcutPressed(event)) {
    isThoughtOpen = !isThoughtOpen
    if (isThoughtOpen) {
      openOverlay(activeThought)
    } else {
      closeOverlay(activeThought)
    }
  }
}

function onBrainThoughtSelect(thought) {
  activeThought = thought
}

function openOverlay(thought) {
  updateLinksList(thought)
  overlay.show()
}

function closeOverlay(thought) {
  save()
  overlay.hide()
}

function onLinkClick(event) {
  var linkId = $(event.target).closest(".lem_link-item").data("link-id")
  var link   = activeThought.links[linkId]
  activeLink = link

  linkTitle.val(link.title)
  linkDescription.val(link.description)
}

function onChnaged() {
  activeLink.title       = linkTitle.val()
  activeLink.description = linkDescription.val()
  if (linkToId.val() != "") {
    activeLink.to = linkToId.val()
  }

  save()
}

function onAddNew(event) {
  activeThought.links.push({
    type: "ref"
  })
  updateLinksList(activeThought)
}

function isShortcutPressed(event) {
  return (event.char == "B") && event.ctrlKey
}

function save() {
  notify("brain.thought.changed", activeThought)
}

function linkView(link, id) {
  var linkTo = shared.getThoughtById(link.to) || { title: "?", description: "?" }

  return "" +
    "<div class='uk-panel uk-panel-box lem_link-item' data-link-id='" + id + "'>" +
    "  <div class='uk-panel-badge uk-badge'> " + (link.type || "") + "</div>" +
    "  <h3 class='uk-panel-title'>" + (linkTo.title || "") + "</h3>" +
    "  " + (link.description || "")+
    "</div>"
}

// events
function onBrainOpenCompleted(argument) {
  upadteAutocomplete()
}

// TODO: Create once on open completed. Push to hashed array
//       when new thought created
function upadteAutocomplete() {
  var thoughts     = shared.getThoughts()
  var autocomplete = $("#lem_link-to")
  var underscore   = require("underscore")
  var data         = underscore.map(thoughts, function(t) {
    return { id: t._id, value: t.title, text:t.description}
  })

  UIkit.autocomplete(autocomplete, { source: data });

  UIkit.$('#lem_link-to').on('selectitem.uk.autocomplete', function (e, data, ac) {
    linkToId.val(data.id) //console.log(data)
    onChnaged(null)
  });
}

function updateLinksList(thought) {
  linksList.html("")
  thought.links.forEach(function(link, index) {
    linksList.append(linkView(link, index))
  })
}

//

var activeThought = null
var overlay = null
var isThoughtOpen = false
var shared = null
var activeLink = null

var linksList = null
var linkTitle = null
var linkDescription = null
var linkToId = null

module.exports = { init: init }
