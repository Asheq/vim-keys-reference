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
          return ['shift', 'control', 'g', 'z', 'squareBracket',
            'gShift', 'zShift', 'squareBracketShift',
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
    var el = this
    var keys = keysJson.keys.map(function(keyObj) {
      var variationObj = keyObj.variations
      for (let variation in variationObj) {
        if (variationObj.hasOwnProperty(variation)) {
          variationObj[variation].prettyDisplay =
            el._getVariationPrefix(variation) +
            el._getKeyCase(keyObj, variation)
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
  _getVariationPrefix(variation) {
    return {
      'solo': '',
      'shift': '',
      'control': '^',
      'g': 'g',
      'z': 'z',
      'squareBracket': '[',
      'gShift': 'g',
      'zShift': 'z',
      'squareBracketShift': '[',
    }[variation]
  }
  _isUpperCase(variation) {
    return {
      'solo': false,
      'shift': true,
      'control': false,
      'g': false,
      'z': false,
      'squareBracket': false,
      'gShift': true,
      'zShift': true,
      'squareBracketShift': true,
    }[variation]
  }
  _getKeyCase(keyObj, variation) {
    return (this._isUpperCase(variation) ? keyObj.shiftKey : keyObj.baseKey)
  }
  computeType(type) {
    return type ? type : 'unused'
  }
}

window.customElements.define(NormalModeKeys.is, NormalModeKeys)
