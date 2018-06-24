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
            'control',
          ]
        },
      },
      otherVariations: {
        type: Array,
        value: function() {
          return [
            'z',
            'zShift',
            'squareBracket',
            'squareBracketShift',
          ]
        },
      },
      operatorVariations: {
        type: Array,
        value: function() {
          return [
            'd',
            // 'dShift',
            // 'y',
            // 'yShift',
            // 'c',
            // 'cShift',
            // '=',
            // '=Shift',
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
    return variationDescription.displayTemplate
      .replace(/{{baseKey}}/, baseKey)
      .replace(/{{shiftKey}}/, shiftKey)
  }
  _computeKeys(keysJson) {
    if (!keysJson) {
      return null
    }
    const self = this

    self.basicVariationsDisplay = self.basicVariations.map(x => keysJson.variationDescriptions[x].header)
    self.otherVariationsDisplay = self.otherVariations.map(x => keysJson.variationDescriptions[x].header)
    self.operatorVariationsDisplay = self.operatorVariations.map(x => keysJson.variationDescriptions[x].header)

    keysJson.keys.forEach(function(keyObj) {
      var variationObj = keyObj.variations
      Object.keys(variationObj).forEach(function(variation) {
        variationObj[variation].prettyDisplay =
          self._getPrettyDisplay(variation, keyObj.baseKey, keyObj.shiftKey, keyObj.isSpecial, keysJson.variationDescriptions[variation])
      })

      keyObj.basicVariations = self.basicVariations.map(x => variationObj[x])
      keyObj.otherVariations = self.otherVariations.map(x => variationObj[x])
      keyObj.operatorVariations = self.operatorVariations.map(x => variationObj[x])
    })

    return keysJson.keys
  }
}

window.customElements.define(NormalModeKeys.is, NormalModeKeys)
