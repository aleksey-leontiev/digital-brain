// Quick Details Module :: Predefined Styles

function load(api) {
  t = api.l10n.get("assets/translation.json")
}

function unload(mapi) { }

function getPredefinedStyles() {
  return {
    normal: {
      id:               "normal",
      displayName:      t.styles.normal,
      scaling:          1,
      thoughtColor:     "lightslategray",
      textColor:        "black",
      descriptionColor: "slategray"
    },
    primary: {
      id:               "primary",
      displayName:      t.styles.primary,
      scaling:          2,
      thoughtColor:     "blue",
      textColor:        "blue",
      descriptionColor: "darkblue"
    },
    success: {
      id:               "success",
      displayName:      t.styles.success,
      scaling:          1,
      thoughtColor:     "green",
      textColor:        "green",
      descriptionColor: "darkgreen"
    },
    info: {
      id:               "info",
      displayName:      t.styles.info,
      scaling:           1,
      thoughtColor:     "purple",
      textColor:        "purple",
      descriptionColor: "purple",
    },
    warning: {
      id:               "warning",
      displayName:      t.styles.warning,
      scaling:          1.25,
      thoughtColor:     "orange",
      textColor:        "orange",
      descriptionColor: "black"
    },
    danger: {
      id:               "danger",
      displayName:      t.styles.danger,
      scaling :         3,
      thoughtColor:     "red",
      textColor:        "red",
      descriptionColor: "darkred"
    }
  }
}

var t

module.exports = {
  info: {
    name: "info",
    id:         "digitalBrain.quick.details.styles",
    version:     "0.1",
    author:      "Alexey Leontiev",
    description: "Provides predefined styles"
  },
  load: load, unload: unload,
  getPredefinedStyles: getPredefinedStyles
}
