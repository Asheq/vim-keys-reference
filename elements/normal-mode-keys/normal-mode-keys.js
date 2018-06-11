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
      basicVariations: {
        type: Array,
        value: function() {
          return [
            'base',
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
      operatorVariations: {
        type: Array,
        value: function() {
          return [
            'd',
            'dShift',
          ]
        },
      },
      showDescriptions: {
        type: Boolean,
        value: true,
      },
    }
  }
  _getPrettyDisplay(variationName, baseKey, shiftKey, isSpecial, variationDescription) {
    let prettyDisplay = ''

    switch (variationName) {
      case 'control':
        if (!isSpecial) {
          prettyDisplay = '<C-' + baseKey + '>'
        } else {
          prettyDisplay = '<C-' + baseKey.slice(1, -1) + '>'
        }
        break
      default:
        prettyDisplay += variationDescription.prefix || ''
        if (variationDescription.hasShiftKey) {
          prettyDisplay += shiftKey
        }
        else {
          prettyDisplay += baseKey
        }
        break
    }
    return prettyDisplay
  }
  _computeKeys(keysJson) {
    if (!keysJson) {
      return null
    }
    const self = this

    keysJson.keys.forEach(function(keyObj) {
      var variationObj = keyObj.variations
      Object.keys(variationObj).forEach(function(variation) {
        variationObj[variation].prettyDisplay =
          self._getPrettyDisplay(variation, keyObj.baseKey, keyObj.shiftKey, keyObj.isSpecial, keysJson.variationDescriptions[variation])
      })

      keyObj.basicVariations = self.basicVariations.map(x => variationObj[x])
    })

    return keysJson.keys
  }
}

window.customElements.define(NormalModeKeys.is, NormalModeKeys)
