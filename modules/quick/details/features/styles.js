
function load(mapi, config) {
  // body...
}

function unload(mapi) {

}

function getPredefinedStyles() {
  return {
    normal: {
      id:               "normal",
      displayName:      "Normal",
      scaling:          1,
      thoughtColor:     "black",
      textColor:        "black",
      descriptionColor: "slategray"
    },
    primary: {
      id:               "primary",
      displayName:      "Primary",
      scaling:          2,
      thoughtColor:     "blue",
      textColor:        "blue",
      descriptionColor: "darkblue"
    },
    success: {
      id:               "success",
      displayName:      "Success",
      scaling:          1,
      thoughtColor:     "green",
      textColor:        "green",
      descriptionColor: "darkgreen"
    },
    info: {
      id:               "info",
      displayName:      "Info",
      scaling:           1,
      thoughtColor:     "purple",
      textColor:        "purple",
      descriptionColor: "purple",
    },
    warning: {
      id:               "warning",
      displayName:      "Warning",
      scaling:          1.25,
      thoughtColor:     "orange",
      textColor:        "orange",
      descriptionColor: "black"
    },
    danger: {
      id:               "danger",
      displayName:      "Danger",
      scaling :         3,
      thoughtColor:     "red",
      textColor:        "red",
      descriptionColor: "darkred"
    }
  }
}

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
