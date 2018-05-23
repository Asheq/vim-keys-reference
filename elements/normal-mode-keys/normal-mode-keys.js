class NormalModeKeys extends Polymer.Element {
  static get is() { return 'normal-mode-keys' }
  static get properties() {
    return {
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
          prettyDisplay += keysJson.variationDescriptions[variation].prefix
          prettyDisplay += keysJson.variationDescriptions[variation].hasShiftKey
            === 'true' ? keyObj.shiftKey : keyObj.baseKey
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
