class NormalModeKeys extends Polymer.Element {
  static get is() { return 'normal-mode-keys' }
  static get properties() {
    return {
      selectedTab: {
        type: Number,
        value: 0
      },
      keys: {
        type: Object,
        computed: '_computeKeys(keysJson)',
      },
      descriptionDisplayOrder: {
        type: Array,
        value: function() {
          return [
            'shift',
            'g',
            'gShift',
            'z',
            'zShift',
            'squareBracket',
            'squareBracketShift',
            'control',
          ]
        },
      },
      showDescriptions: {
        type: Boolean,
        value: true,
      },
    }
  }
  _computeKeys(keysJson) {
    if (!keysJson) {
      return null
    }
    var keys = keysJson.keys.map(function(keyObj) {
      var variationObj = keyObj.variations
      for (let variation in variationObj) {
        if (variationObj.hasOwnProperty(variation)) {
          let prettyDisplay = ''

          switch (variation) {
            case 'control':
              if (!keyObj.special) {
                prettyDisplay = '<C-' + keyObj.baseKey + '>'
              } else {
                prettyDisplay = '<C-' + keyObj.baseKey.slice(1, -1) + '>'
              }
              break
            default:
              prettyDisplay += keysJson.variationDescriptions[variation].prefix || '' // add prefix like g or z
              if (keysJson.variationDescriptions[variation].hasShiftKey) { // determine whether to use pretty shiftKey
                prettyDisplay += keyObj.shiftKey
              }
              else {
                prettyDisplay += keyObj.baseKey
              }
              break
          }

          variationObj[variation].prettyDisplay = prettyDisplay
        }
      }
      return keyObj
    })

    return keys
  }
  _toArray(obj) {
    var arr = Object.keys(obj).map(function(key) {
      return {
        name: key,
        value: obj[key],
      }
    })
    arr.sort((a, b) => this.descriptionDisplayOrder.indexOf(a.name) >
      this.descriptionDisplayOrder.indexOf(b.name))
    return arr
  }
  isEqual(one, two) {
    return one === two
  }
}

window.customElements.define(NormalModeKeys.is, NormalModeKeys)
