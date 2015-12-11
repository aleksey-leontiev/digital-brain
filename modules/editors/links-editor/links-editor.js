
function load(mapi) {
  api = mapi

  // create overlay
  view = {
    overlay:         api.views.createOverlay("view.html"),
    linksList:       $("#lem_links-list"),
    linkTitle:       $("#lem_link-title"),
    linkDescription: $("#lem_link-description"),
    linkToId:        $("#lem_link-to-id"),
    linkTo:          $("#lem_link-to-text")
  }

  api.events.subscribe([
    { id: "key.down",                handler: onKeyDown },
    { id: "brain.thought.select",    handler: onBrainThoughtSelect },
    { id: "brain.open.completed",    handler: onBrainOpenCompleted },

    { view: "#lem_link-title",       id: "change", handler: onChnaged },
    { view: "#lem_link-description", id: "change", handler: onChnaged },
    { view: "#lem_add-new",          id: "click", handler: onAddNew },

    { delegate: "#lem_links-list",   view: ".lem_link-item", id: "click", handler: onLinkClick }
  ])

  // load additional modules
  shared = api.app.request("modules/shared")
}

function unload(api) {
  api.events.unsubscribe()
  view.overlay.remove()
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
  view.linksList.val("")
  view.linkTitle.val("")
  view.linkDescription.val("")
  view.linkToId.val("")
  view.linkTo.val("")

  updateLinksList(thought)
  view.overlay.show()
}

function closeOverlay(thought) {
  save()
  view.overlay.hide()
}

function onLinkClick(event) {
  $(".uk-panel-box-primary", $("#lem_root")).removeClass("uk-panel-box-primary")
  $(event.target).closest(".lem_link-item").addClass("uk-panel-box-primary")

  var linkId  = $(event.target).closest(".lem_link-item").data("link-id")
  var link    = activeThought.links[linkId]
  var thought = shared.getThoughtById(link.to)
  activeLink = link

  if (thought != null) {
    view.linkTo.val(thought.title || "")
  }
  view.linkToId.val(link.to)
  view.linkTitle.val(link.title)
  view.linkDescription.val(link.description || "")
}

function onChnaged() {
  activeLink.title       = view.linkTitle.val()
  activeLink.description = view.linkDescription.val()
  if (view.linkToId.val() != "") {
    activeLink.to = view.linkToId.val()
  }

  save()
  updateLinksList(activeThought)
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
  api.events.notify("brain.thought.changed", activeThought)
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
    view.linkToId.val(data.id) //console.log(data)
    onChnaged(null)
  });
}

function updateLinksList(thought) {
  view.linksList.html("")
  thought.links.forEach(function(link, index) {
    view.linksList.append(linkView(link, index))
  })
}

var api
var view
var activeThought = null
var isThoughtOpen = false
var shared = null
var activeLink = null

module.exports = {
  load: load, unload: unload,

  info: {
    id:      "digitalBrain.editors.linksEditor",
    name:    "Thougth Links Editor",
    version: "0.1",
    author:  "Alexey Leontiev"
  }
}
