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
      showDescriptions: {
        type: Boolean,
        value: true
      },
      variationCategories: {
        type: Array,
        value: function() {
          return [{
            name: 'Basic',
            id: 'basic',
            variations: [
              'base',
              'shift',
              'g',
              'gShift',
              'control',
            ],
          }, {
            name: 'Z and z',
            id: 'z',
            variations: [
              'z',
              'zShift',
              'Z',
              'ZShift'
            ],
          }, {
            name: 'Square Bracket',
            id: 'square',
            variations: [
              'squareBracket',
              'squareBracketShift',
              'squareBracketRight',
              'squareBracketRightShift',
            ],
          }, {
            name: 'Starting with Operator',
            id: 'operator',
            variations: [
              'd',
              'dShift',
              'y',
              'yShift',
              'c',
              'cShift',
              '=',
              '=Shift',
            ]
          }, {
            name: 'Other',
            id: 'other',
            variations: [
              '<C-w>',
              '"',
            ]
          }]
        }
      }
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

    keysJson.keys.forEach(function(keyObj) {
      var variationObj = keyObj.variations
      Object.keys(variationObj).forEach(function(variation) {
        variationObj[variation].prettyDisplay =
          self._getPrettyDisplay(variation, keyObj.baseKey, keyObj.shiftKey, keyObj.isSpecial, keysJson.variationDescriptions[variation])
      })
      for (const variationCategory of self.variationCategories) {
        keyObj[variationCategory.id + 'Variations'] = variationCategory.variations.map(x => variationObj[x])
      }
    })

    return keysJson.keys
  }
}

window.customElements.define(NormalModeKeys.is, NormalModeKeys)
