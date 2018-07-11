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
              // 'squareBracketRight',
              // 'squareBracketRightShift',
            ],
          }, {
            name: 'Starting with Operator',
            id: 'operator',
            variations: [
              // 'd',
              // 'dShift',
              // 'y',
              // 'yShift',
              // 'c',
              // 'cShift',
              // '=',
              // '=Shift',
            ]
          }, {
            name: 'Other',
            id: 'other',
            variations: [
              // '<C-w>',
              // '<C-\>',
              // '"',
              // "'",
              // '`',
              // 'q',
              // '@',
            ]
          }]
        }
      }
    }
  }
  _getPrettyDisplay(variationName, {baseKey, shiftKey, controlKey}) {
    let prettyDisplay
    switch (variationName) {
      case 'base':
        prettyDisplay = baseKey
        break
      case 'shift':
        prettyDisplay = shiftKey
        break
      case 'g':
        prettyDisplay = 'g' + baseKey
        break
      case 'gShift':
        prettyDisplay = 'g' + shiftKey
        break
      case 'z':
        prettyDisplay = 'z' + baseKey
        break
      case 'zShift':
        prettyDisplay = 'z' + shiftKey
        break
      case 'Z':
        prettyDisplay = 'Z' + baseKey
        break
      case 'ZShift':
        prettyDisplay = 'Z' + shiftKey
        break
      case 'd':
        prettyDisplay = 'd' + baseKey
        break
      case 'squareBracket':
        prettyDisplay = '[' + baseKey
        break
      case 'squareBracketShift':
        prettyDisplay = '[' + shiftKey
        break
      case 'control':
        prettyDisplay = controlKey || '<C-' + baseKey + '>'
        break
      default:
        prettyDisplay = ''
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
        variationObj[variation].prettyDisplay = self._getPrettyDisplay(variation, keyObj)
      })
      for (const variationCategory of self.variationCategories) {
        keyObj[variationCategory.id + 'Variations'] = variationCategory.variations.map(x => variationObj[x])
      }
    })

    return keysJson.keys
  }
}

window.customElements.define(NormalModeKeys.is, NormalModeKeys)
